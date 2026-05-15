import fs from 'node:fs';
import path from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const DEFAULT_PLAN_ID = '162';
const DEFAULT_SUITE_ID = '845';
const DEFAULT_API_VERSION = '7.1-preview.1';

function readEnvFile(envPath) {
  if (!fs.existsSync(envPath)) {
    return {};
  }
  const text = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    env[key] = value;
  }
  return env;
}

function parseArgs(argv) {
  const options = {};
  for (const token of argv) {
    const eq = token.indexOf('=');
    if (eq === -1) continue;
    options[token.slice(0, eq)] = token.slice(eq + 1);
  }
  return options;
}

function normalizeOrgUrl(orgUrl, project) {
  let value = String(orgUrl || '').trim();
  if (!value) return value;
  value = value.replace(/\/+$/, '');

  // Accept accidental org URLs that include a project segment and trim it safely.
  const encodedProject = encodeURIComponent(String(project || '').trim());
  if (encodedProject) {
    const pattern = new RegExp(`/${encodedProject}$`, 'i');
    value = value.replace(pattern, '');
  }

  // Keep only https://dev.azure.com/{organization} when possible.
  const m = value.match(/^(https?:\/\/dev\.azure\.com\/[^/]+)/i);
  if (m) {
    return m[1];
  }

  return value;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function nowStamp() {
  const dt = new Date();
  const yyyy = String(dt.getFullYear());
  const MM = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  const hh = String(dt.getHours()).padStart(2, '0');
  const mm = String(dt.getMinutes()).padStart(2, '0');
  const ss = String(dt.getSeconds()).padStart(2, '0');
  return `${yyyy}${MM}${dd}-${hh}${mm}${ss}`;
}

function escHtml(value) {
  const s = String(value ?? '');
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtmlTags(input) {
  return String(input ?? '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeXmlEntities(input) {
  const map = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };
  return String(input ?? '').replace(/&lt;|&gt;|&amp;|&quot;|&#39;|&nbsp;/g, (m) => map[m] || m);
}

function parseTestSteps(rawSteps) {
  const decoded = decodeXmlEntities(rawSteps || '');
  const stepRegex = /<step\b[^>]*id="(\d+)"[^>]*>([\s\S]*?)<\/step>/gi;
  const paramRegex = /<parameterizedString\b[^>]*>([\s\S]*?)<\/parameterizedString>/gi;
  const cdataRegex = /<!\[CDATA\[([\s\S]*?)\]\]>/i;
  const steps = [];

  let stepMatch;
  while ((stepMatch = stepRegex.exec(decoded)) !== null) {
    const content = stepMatch[2] || '';
    const params = [];
    let paramMatch;
    while ((paramMatch = paramRegex.exec(content)) !== null) {
      const body = paramMatch[1] || '';
      const cdata = cdataRegex.exec(body);
      const value = cdata ? cdata[1] : body;
      params.push(stripHtmlTags(value));
    }
    const action = params[0] || '';
    const expected = params[1] || '';
    if (action || expected) {
      steps.push({
        stepNumber: steps.length + 1,
        action,
        expected
      });
    }
  }

  return steps;
}

function getAuthHeader(pat) {
  const token = Buffer.from(`:${pat}`, 'utf8').toString('base64');
  return `Basic ${token}`;
}

async function azureFetch({ method = 'GET', url, pat, body }) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: getAuthHeader(pat),
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Azure API ${method} ${url} failed (${response.status}): ${txt.slice(0, 500)}`);
  }
  if (response.status === 204) {
    return null;
  }
  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

async function validatePlanSuite(config) {
  const { orgUrl, project, planId, suiteId, apiVersion, pat } = config;
  const planUrl = `${orgUrl}/${encodeURIComponent(project)}/_apis/testplan/Plans/${planId}?api-version=${apiVersion}`;
  const suiteUrl = `${orgUrl}/${encodeURIComponent(project)}/_apis/testplan/Plans/${planId}/Suites/${suiteId}?api-version=${apiVersion}`;
  await azureFetch({ url: planUrl, pat });
  await azureFetch({ url: suiteUrl, pat });
}

async function getSuitePoints(config) {
  const { orgUrl, project, planId, suiteId, apiVersion, pat } = config;
  const endpoints = [
    `${orgUrl}/${encodeURIComponent(project)}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestPoint?includePointDetails=true&api-version=${apiVersion}`,
    `${orgUrl}/${encodeURIComponent(project)}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestPoint?api-version=${apiVersion}`,
    `${orgUrl}/${encodeURIComponent(project)}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?includePointDetails=true&api-version=${apiVersion}`,
    `${orgUrl}/${encodeURIComponent(project)}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?api-version=7.1`,
    `${orgUrl}/${encodeURIComponent(project)}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestCase?api-version=${apiVersion}`,
    `${orgUrl}/${encodeURIComponent(project)}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestCase?api-version=7.1-preview.2`
  ];

  let payload = null;
  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      payload = await azureFetch({ url: endpoint, pat });
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!payload) {
    throw lastError || new Error('Unable to fetch test points for suite.');
  }

  const values = Array.isArray(payload?.value) ? payload.value : [];
  const mapped = [];
  for (const p of values) {
    const directPointId = String(p.id ?? p.pointId ?? '').trim();
    const directCaseId = String(
      p.testCase?.id ?? p.testCaseReference?.id ?? p.testCaseId ?? p.workItem?.id ?? ''
    ).trim();

    if (directPointId && directCaseId) {
      mapped.push({ pointId: directPointId, testCaseId: directCaseId });
      continue;
    }

    const pointAssignments = Array.isArray(p.pointAssignments) ? p.pointAssignments : [];
    const fallbackCaseId = String(p.workItem?.id ?? p.testCase?.id ?? '').trim();
    for (const pa of pointAssignments) {
      const pointId = String(pa.id ?? pa.pointId ?? '').trim();
      if (pointId && fallbackCaseId) {
        mapped.push({ pointId, testCaseId: fallbackCaseId });
      }
    }
  }

  const dedup = new Map();
  for (const item of mapped) {
    const key = `${item.pointId}:${item.testCaseId}`;
    if (!dedup.has(key)) dedup.set(key, item);
  }
  return [...dedup.values()];
}

async function getTestCaseDetails(config, testCaseId) {
  const { orgUrl, project, apiVersion, pat } = config;
  const wiUrl = `${orgUrl}/${encodeURIComponent(project)}/_apis/wit/workitems/${testCaseId}?$expand=all&api-version=${apiVersion}`;
  try {
    const wi = await azureFetch({ url: wiUrl, pat });
    const title = wi?.fields?.['System.Title'] || `Test Case ${testCaseId}`;
    const rawSteps = wi?.fields?.['Microsoft.VSTS.TCM.Steps'] || '';
    const steps = parseTestSteps(rawSteps);
    return {
      testCaseId: String(testCaseId),
      title,
      revision: Number(wi?.rev || 1),
      steps,
      detailError: null
    };
  } catch (error) {
    return {
      testCaseId: String(testCaseId),
      title: `Test Case ${testCaseId}`,
      revision: 1,
      steps: [
        {
          stepNumber: 1,
          action: 'Unable to fetch step definition from Azure for this test case.',
          expected: ''
        }
      ],
      detailError: `Detail fetch failed: ${String(error?.message || error)}`
    };
  }
}

function pickBrowser(name) {
  const key = String(name || '').toLowerCase();
  if (key === 'firefox') return firefox;
  if (key === 'webkit') return webkit;
  return chromium;
}

async function tryClick(page, label) {
  const roleRegex = new RegExp(`^${label}$`, 'i');
  const fallbackRegex = new RegExp(label, 'i');

  const candidates = [
    () => page.getByRole('button', { name: roleRegex }).first().click({ timeout: 5000 }),
    () => page.getByRole('link', { name: roleRegex }).first().click({ timeout: 5000 }),
    () => page.getByText(fallbackRegex).first().click({ timeout: 5000 }),
    () => page.locator(`text=${label}`).first().click({ timeout: 5000 })
  ];

  for (const action of candidates) {
    try {
      await action();
      return;
    } catch {
      // Try next selector strategy.
    }
  }
  throw new Error(`Unable to click target: ${label}`);
}

async function tryFill(page, field, value) {
  const roleRegex = new RegExp(field, 'i');
  const fillCandidates = [
    () => page.getByLabel(roleRegex).first().fill(value, { timeout: 5000 }),
    () => page.getByPlaceholder(roleRegex).first().fill(value, { timeout: 5000 }),
    () => page.getByRole('textbox', { name: roleRegex }).first().fill(value, { timeout: 5000 }),
    () => page.locator(`input[name*="${field}" i]`).first().fill(value, { timeout: 5000 })
  ];

  for (const action of fillCandidates) {
    try {
      await action();
      return;
    } catch {
      // Try next selector strategy.
    }
  }

  throw new Error(`Unable to fill field: ${field}`);
}

function inferQuotedText(input) {
  const m = String(input).match(/["']([^"']+)["']/);
  return m ? m[1].trim() : '';
}

function inferUrl(input) {
  const m = String(input).match(/https?:\/\/[^\s)]+/i);
  return m ? m[0] : '';
}

function inferFillInstruction(action) {
  const quoted = inferQuotedText(action);
  const pattern = /(?:enter|type|input|fill)\s+(?:the\s+)?(.+?)\s+(?:with|as|to)\s+["'][^"']+["']/i;
  const m = String(action).match(pattern);
  if (!m) return null;
  return { field: m[1].trim(), value: quoted };
}

async function executeStep(page, step, baseUrl) {
  const action = step.action || '';
  const normalized = action.toLowerCase();

  if (!action.trim()) {
    return { actualResult: 'No action text in step; screenshot captured only.', status: 'Blocked' };
  }

  if (/(navigate|open|go to|launch|visit)/i.test(normalized)) {
    const urlFromStep = inferUrl(action);
    const url = urlFromStep || baseUrl;
    if (!url) {
      return { actualResult: 'No URL in step or configured base URL; screenshot captured only.', status: 'Blocked' };
    }
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    return { actualResult: `Navigated to ${url}.`, status: 'Pass' };
  }

  if (/(click|tap|press)/i.test(normalized)) {
    const target = inferQuotedText(action) || action.replace(/^(click|tap|press)\s+/i, '').trim();
    if (!target) {
      return { actualResult: 'Click step had no target text; screenshot captured only.', status: 'Blocked' };
    }
    await tryClick(page, target);
    return { actualResult: `Clicked target "${target}".`, status: 'Pass' };
  }

  if (/(enter|type|input|fill)/i.test(normalized)) {
    const fillInstruction = inferFillInstruction(action);
    if (!fillInstruction) {
      return { actualResult: 'Unable to infer field/value for input step; screenshot captured only.', status: 'Blocked' };
    }
    await tryFill(page, fillInstruction.field, fillInstruction.value);
    return {
      actualResult: `Entered value into field "${fillInstruction.field}".`,
      status: 'Pass'
    };
  }

  if (/(verify|should|expect|validate|see)/i.test(normalized)) {
    const expectedText = inferQuotedText(step.expected || action) || stripHtmlTags(step.expected || '');
    if (!expectedText) {
      return { actualResult: 'Verification step had no expected text; screenshot captured only.', status: 'Blocked' };
    }
    await page.getByText(new RegExp(expectedText, 'i')).first().waitFor({ timeout: 7000 });
    return { actualResult: `Verified expected text "${expectedText}" is visible.`, status: 'Pass' };
  }

  return {
    actualResult: 'No automation mapping for step action; screenshot captured only.',
    status: 'Blocked'
  };
}

function relativePath(fromFile, toFile) {
  return path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
}

function buildReportHtml({ config, runTitle, timestamp, summary, testResults }) {
  const rowsHtml = testResults
    .map((tc) => {
      const stepRows = tc.steps
        .map((s) => {
          const cssClass = s.status === 'Pass' ? 'row-pass' : s.status === 'Fail' ? 'row-fail' : 'row-blocked';
          const shot = s.screenshotRelative
            ? `<a href="${escHtml(s.screenshotRelative)}" target="_blank"><img src="${escHtml(s.screenshotRelative)}" alt="step screenshot" class="thumb" /></a>`
            : '';
          return `<tr class="${cssClass}"><td>${s.stepNumber}</td><td>${escHtml(s.action)}</td><td>${escHtml(
            s.expected
          )}</td><td>${escHtml(s.actualResult)}</td><td>${escHtml(s.status)}</td><td>${shot}</td></tr>`;
        })
        .join('');

      return `<section class="testcase"><h3>Test Case ${escHtml(tc.testCaseId)}: ${escHtml(tc.title)} - ${escHtml(
        tc.outcome
      )}</h3><table><thead><tr><th>Step #</th><th>Step Action</th><th>Expected Result</th><th>Actual Result</th><th>Step Status</th><th>Screenshot</th></tr></thead><tbody>${stepRows}</tbody></table></section>`;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Azure Execution ${escHtml(config.planId)}-${escHtml(config.suiteId)}</title>
  <style>
    body { font-family: Segoe UI, Arial, sans-serif; margin: 20px; background: #f6f8fb; color: #0f172a; }
    h1, h2, h3 { margin: 8px 0; }
    .summary { background: #fff; border: 1px solid #dbe3ee; border-radius: 10px; padding: 14px; margin-bottom: 18px; }
    .testcase { background: #fff; border: 1px solid #dbe3ee; border-radius: 10px; padding: 14px; margin-bottom: 18px; }
    table { border-collapse: collapse; width: 100%; font-size: 13px; }
    th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #e5ecf6; }
    .row-pass { background: #ecfdf3; }
    .row-fail { background: #fef2f2; }
    .row-blocked { background: #fffbeb; }
    .thumb { width: 190px; border: 1px solid #cbd5e1; border-radius: 4px; }
    .metrics { display: flex; gap: 14px; flex-wrap: wrap; margin: 8px 0; }
    .metric { background: #f8fafc; border: 1px solid #dbe3ee; border-radius: 8px; padding: 8px 10px; }
  </style>
</head>
<body>
  <h1>Azure Test Execution Report</h1>
  <section class="summary">
    <h2>Execution Summary</h2>
    <div><strong>Organization/Project:</strong> ${escHtml(config.orgUrl)} / ${escHtml(config.project)}</div>
    <div><strong>Plan ID:</strong> ${escHtml(config.planId)} | <strong>Suite ID:</strong> ${escHtml(config.suiteId)}</div>
    <div><strong>Run Title:</strong> ${escHtml(runTitle)}</div>
    <div><strong>Timestamp:</strong> ${escHtml(timestamp)}</div>
    <div class="metrics">
      <div class="metric"><strong>Total:</strong> ${summary.total}</div>
      <div class="metric"><strong>Passed:</strong> ${summary.passed}</div>
      <div class="metric"><strong>Failed:</strong> ${summary.failed}</div>
      <div class="metric"><strong>Blocked:</strong> ${summary.blocked}</div>
    </div>
  </section>
  ${rowsHtml}
</body>
</html>`;
}

async function createAzureRun(config, runTitle, pointIds) {
  const url = `${config.orgUrl}/${encodeURIComponent(config.project)}/_apis/test/runs?api-version=7.1`;
  const body = {
    name: runTitle,
    plan: { id: String(config.planId) },
    pointIds,
    automated: false
  };
  const run = await azureFetch({ method: 'POST', url, pat: config.pat, body });
  return String(run.id);
}

async function publishAzureResults(config, runId, testResults) {
  const url = `${config.orgUrl}/${encodeURIComponent(config.project)}/_apis/test/runs/${runId}/results?api-version=7.1`;
  const body = testResults.map((tc) => {
    const failedSteps = tc.steps.filter((s) => s.status === 'Fail');
    const blockedSteps = tc.steps.filter((s) => s.status === 'Blocked');
    const commentLines = [
      ...failedSteps.map((s) => `Step ${s.stepNumber} failed: ${s.actualResult}`),
      ...blockedSteps.map((s) => `Step ${s.stepNumber} blocked: ${s.actualResult}`)
    ];

    return {
      testCase: { id: String(tc.testCaseId) },
      testPoint: { id: String(tc.pointId) },
      testCaseTitle: String(tc.title || `Test Case ${tc.testCaseId}`),
      testCaseRevision: Number(tc.revision || 1),
      outcome: tc.outcome === 'Pass' ? 'Passed' : 'Failed',
      state: 'Completed',
      comment: commentLines.join('\n').slice(0, 1000)
    };
  });

  return azureFetch({ method: 'POST', url, pat: config.pat, body });
}

async function attachFileToRun(config, runId, filePath) {
  const url = `${config.orgUrl}/${encodeURIComponent(config.project)}/_apis/test/runs/${runId}/attachments?api-version=7.1`;
  const fileBytes = fs.readFileSync(filePath);
  const body = {
    stream: fileBytes.toString('base64'),
    fileName: path.basename(filePath),
    comment: 'Execution HTML report',
    attachmentType: 'GeneralAttachment'
  };

  try {
    await azureFetch({ method: 'POST', url, pat: config.pat, body });
    return true;
  } catch {
    return false;
  }
}

async function completeRun(config, runId) {
  const url = `${config.orgUrl}/${encodeURIComponent(config.project)}/_apis/test/runs/${runId}?api-version=7.1`;
  await azureFetch({
    method: 'PATCH',
    url,
    pat: config.pat,
    body: { state: 'Completed' }
  });
}

async function main() {
  const workspace = process.cwd();
  const env = readEnvFile(path.join(workspace, '.env'));
  const args = parseArgs(process.argv.slice(2));

  const planId = args.planId || env.AZURE_TEST_PLAN_ID || DEFAULT_PLAN_ID;
  const suiteId = args.suiteId || env.AZURE_TEST_SUITE_ID || DEFAULT_SUITE_ID;
  const orgUrl = normalizeOrgUrl(env.AZURE_ORG_URL || '', env.AZURE_PROJECT || '');
  const project = env.AZURE_PROJECT || '';
  const pat = env.AZURE_PAT || '';
  const apiVersion = env.AZURE_API_VERSION || DEFAULT_API_VERSION;
  const browserName = args.browser || env.PLAYWRIGHT_BROWSER || 'chromium';
  const baseUrl = args.baseUrl || env.PLAYWRIGHT_BASE_URL || '';
  const runTitle = args.runTitle || `Azure Execution Plan ${planId} Suite ${suiteId} ${new Date().toISOString()}`;

  const missing = [];
  if (!orgUrl) missing.push('AZURE_ORG_URL');
  if (!project) missing.push('AZURE_PROJECT');
  if (!pat) missing.push('AZURE_PAT');

  if (missing.length) {
    console.error(`Missing required .env keys: ${missing.join(', ')}`);
    process.exit(1);
  }

  const config = { orgUrl, project, pat, apiVersion, planId, suiteId };
  await validatePlanSuite(config);

  const points = await getSuitePoints(config);
  if (!points.length) {
    throw new Error(`No test points found for planId=${planId} suiteId=${suiteId}.`);
  }

  const uniqueCaseIds = [...new Set(points.map((p) => p.testCaseId))];
  const casesById = new Map();
  for (const testCaseId of uniqueCaseIds) {
    const details = await getTestCaseDetails(config, testCaseId);
    casesById.set(testCaseId, details);
  }

  const browserType = pickBrowser(browserName);
  const browser = await browserType.launch({ headless: true });
  const stamp = nowStamp();
  const screenshotsRoot = path.join(workspace, 'screenshots', 'azure-execution', `${planId}-${suiteId}`);
  const reportDir = path.join(workspace, 'reports', 'test-execution');
  ensureDir(screenshotsRoot);
  ensureDir(reportDir);

  const testResults = [];

  try {
    for (const point of points) {
      const tc = casesById.get(point.testCaseId);
      const tcSteps = tc?.steps?.length ? tc.steps : [{ stepNumber: 1, action: 'No step definition found in Azure test case.', expected: '' }];
      const context = await browser.newContext();
      const page = await context.newPage();

      const caseShotDir = path.join(screenshotsRoot, String(point.testCaseId));
      ensureDir(caseShotDir);

      const stepResults = [];
      for (let i = 0; i < tcSteps.length; i += 1) {
        const step = tcSteps[i];
        const stepNumber = i + 1;
        const shotPath = path.join(caseShotDir, `step-${String(stepNumber).padStart(2, '0')}.png`);

        let status = 'Pass';
        let actualResult = '';
        try {
          const result = await executeStep(page, step, baseUrl);
          status = result.status;
          actualResult = result.actualResult;
        } catch (error) {
          status = 'Fail';
          actualResult = `Execution error: ${String(error?.message || error)}`;
        }

        await page.screenshot({ path: shotPath, fullPage: true });

        stepResults.push({
          stepNumber,
          action: step.action,
          expected: step.expected,
          actualResult: tc?.detailError && stepNumber === 1 ? `${actualResult} ${tc.detailError}` : actualResult,
          status,
          screenshotPath: shotPath
        });
      }

      const outcome = stepResults.some((s) => s.status === 'Fail') ? 'Fail' : 'Pass';
      testResults.push({
        testCaseId: String(point.testCaseId),
        title: tc?.title || `Test Case ${point.testCaseId}`,
        revision: Number(tc?.revision || 1),
        pointId: String(point.pointId),
        outcome,
        steps: stepResults
      });

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const summary = {
    total: testResults.length,
    passed: testResults.filter((t) => t.outcome === 'Pass').length,
    failed: testResults.filter((t) => t.outcome === 'Fail').length,
    blocked: testResults.filter((t) => t.steps.some((s) => s.status === 'Blocked')).length
  };

  const reportPath = path.join(reportDir, `azure-execution-${planId}-${suiteId}-${stamp}.html`);
  const reportPayload = {
    config,
    runTitle,
    timestamp: new Date().toISOString(),
    summary,
    testResults: testResults.map((tc) => ({
      ...tc,
      steps: tc.steps.map((s) => ({
        ...s,
        screenshotRelative: relativePath(reportPath, s.screenshotPath)
      }))
    }))
  };

  const html = buildReportHtml(reportPayload);
  fs.writeFileSync(reportPath, html, 'utf8');

  let runId = null;
  let azureUpdateErrors = [];
  try {
    runId = await createAzureRun(config, runTitle, points.map((p) => Number(p.pointId)));
    await publishAzureResults(config, runId, testResults);
    await attachFileToRun(config, runId, reportPath);
    await completeRun(config, runId);
  } catch (error) {
    azureUpdateErrors.push(String(error?.message || error));
  }

  const output = {
    planId: String(planId),
    suiteId: String(suiteId),
    executedTestCases: testResults.length,
    counts: {
      passed: summary.passed,
      failed: summary.failed,
      blocked: summary.blocked
    },
    azureRun: {
      id: runId,
      state: runId ? (azureUpdateErrors.length ? 'PartiallyFailed' : 'Completed') : 'NotCreated'
    },
    reportPath,
    screenshotsRoot,
    azureUpdateErrors
  };

  console.log(JSON.stringify(output, null, 2));

  if (azureUpdateErrors.length) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(String(error?.message || error));
  process.exit(1);
});
