import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { diffLines } from 'diff';

test('Web Actions - Handling Alerts', async ({ page }, testInfo) => {

// 1. Enter URL and Launch the application (https://demoqa.com/alerts)
await page.goto('https://demoqa.com/alerts');

// Capture complete HTML before any interactions
const beforeHtml = await page.content();

//take screenshot of the page
await page.screenshot({ path: 'screenshots/before.png'});

// 2. Locate Alert buttons to trigger the alerts
const informationAlertButton = page.locator('button#alertButton');
const confirmationAlertButton = page.locator('button#confirmButton');
const promptAlertButton = page.locator('button#promtButton');

// 3. Click on the information alert and copy the alert message and then select OK button
page.once('dialog', async dialog => {

    //Copy and print the alert message
    console.log("Info Alert message : "+await dialog.message());

    //Click on the OK button
    await dialog.accept();
})

// Trigger the information alert. 
await informationAlertButton.click();

// wait for the 2 sec
await page.waitForTimeout(2000);

// 4. Click on the Confirmation alert, copy the alert message, and select the Cancel button.
page.once('dialog', async dialog => {

    //Copy and print the alert message
    console.log("Confirmation Alert message : "+await dialog.message());

    //Click on the CANCEL button
    await dialog.dismiss();
})

// Trigger the confirmation alert. 
await confirmationAlertButton.click();

// wait for the 2 sec
await page.waitForTimeout(2000);

// 5. Click on the prompt alert. Copy the alert message. Enter text. Then Select OK button.
page.once('dialog', async dialog => {

    //Copy and print the alert message
    console.log("Prompt Alert message : "+await dialog.message());

    //Click on the OK button
    await dialog.accept("Playwright");
})

// Trigger the prompt alert. 
await promptAlertButton.click();

// wait for the 2 sec
await page.waitForTimeout(2000);

//take screenshot of the page
await page.screenshot({ path: 'screenshots/after.png'});

// Capture complete HTML after all interactions
const afterHtml = await page.content();

// Compare the screenshots and publish the differences in the test report.
const beforeImagePath = 'screenshots/before.png';
const afterImagePath  = 'screenshots/after.png';

const beforeBuffer = fs.readFileSync(beforeImagePath);
const afterBuffer  = fs.readFileSync(afterImagePath);

// Decode PNGs for pixel-level comparison
const beforePng = PNG.sync.read(beforeBuffer);
const afterPng  = PNG.sync.read(afterBuffer);

const { width, height } = beforePng;
const diffPng = new PNG({ width, height });

// Compare pixels; threshold 0.1 tolerates minor anti-aliasing differences
const diffPixelCount = pixelmatch(
    beforePng.data,
    afterPng.data,
    diffPng.data,
    width,
    height,
    { threshold: 0.1 }
);

// Save the diff image to disk
const diffImagePath = 'screenshots/diff.png';
fs.writeFileSync(diffImagePath, PNG.sync.write(diffPng));

console.log(`Pixel difference count: ${diffPixelCount}`);

// Embed all three images as base64 so the HTML report is fully self-contained
const beforeBase64 = beforeBuffer.toString('base64');
const afterBase64  = afterBuffer.toString('base64');
const diffBase64   = PNG.sync.write(diffPng).toString('base64');

const changedPercent = ((diffPixelCount / (width * height)) * 100).toFixed(2);
const statusColor    = diffPixelCount === 0 ? '#2ecc71' : '#e74c3c';
const statusLabel    = diffPixelCount === 0 ? 'No visual differences detected' : `${diffPixelCount} pixel(s) changed (${changedPercent}% of page)`;

// Build a side-by-side HTML comparison report
const htmlReport = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Visual Comparison Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #1a1a2e; color: #eee; padding: 24px; }
    h1 { text-align: center; font-size: 22px; margin-bottom: 8px; color: #fff; }
    .subtitle { text-align: center; font-size: 13px; color: #aaa; margin-bottom: 20px; }
    .status-banner {
      text-align: center; padding: 10px 20px; border-radius: 8px;
      background: ${statusColor}22; border: 1px solid ${statusColor};
      color: ${statusColor}; font-weight: 600; font-size: 15px; margin-bottom: 28px;
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    .card { background: #16213e; border-radius: 10px; overflow: hidden; border: 1px solid #0f3460; }
    .card-header {
      padding: 10px 14px; font-size: 12px; font-weight: 700;
      letter-spacing: 1px; text-transform: uppercase;
    }
    .before  .card-header { background: #0f3460; color: #74b9ff; }
    .after   .card-header { background: #0f3460; color: #55efc4; }
    .diff    .card-header { background: #0f3460; color: #fd79a8; }
    .card-body { padding: 10px; }
    .card-desc { font-size: 11px; color: #aaa; padding: 0 14px 10px; }
    img { width: 100%; border-radius: 4px; display: block; }
  </style>
</head>
<body>
  <h1>Visual Comparison Report</h1>
  <p class="subtitle">Page: https://demoqa.com/alerts &nbsp;|&nbsp; Test: Web Actions - Handling Alerts</p>
  <div class="status-banner">${statusLabel}</div>
  <div class="grid">
    <div class="card before">
      <div class="card-header">Before</div>
      <p class="card-desc">Initial page load — before any alerts were triggered.</p>
      <div class="card-body"><img src="data:image/png;base64,${beforeBase64}" alt="Before"/></div>
    </div>
    <div class="card after">
      <div class="card-header">After</div>
      <p class="card-desc">Page state after all three alerts were handled.</p>
      <div class="card-body"><img src="data:image/png;base64,${afterBase64}" alt="After"/></div>
    </div>
    <div class="card diff">
      <div class="card-header">Diff (changed pixels highlighted in red)</div>
      <p class="card-desc">Red pixels mark every area that changed between Before and After.</p>
      <div class="card-body"><img src="data:image/png;base64,${diffBase64}" alt="Diff"/></div>
    </div>
  </div>
</body>
</html>`;

// Publish the self-contained HTML comparison report
await testInfo.attach('Visual Comparison Report', {
    body: htmlReport,
    contentType: 'text/html'
});

// ── HTML Structure Comparison ────────────────────────────────────────────────

// Compute line-by-line diff between the two HTML snapshots
const htmlDiff = diffLines(beforeHtml, afterHtml);

let addedLines   = 0;
let removedLines = 0;
let diffRows     = '';

for (const part of htmlDiff) {
    const lines = part.value.split('\n').filter(l => l.trim() !== '');
    if (part.added) {
        addedLines += lines.length;
        for (const line of lines) {
            diffRows += `<tr class="added">
              <td class="gutter">+</td>
              <td><code>${escapeHtml(line)}</code></td>
            </tr>`;
        }
    } else if (part.removed) {
        removedLines += lines.length;
        for (const line of lines) {
            diffRows += `<tr class="removed">
              <td class="gutter">−</td>
              <td><code>${escapeHtml(line)}</code></td>
            </tr>`;
        }
    } else {
        // Show a collapsed context row for unchanged blocks
        diffRows += `<tr class="context">
          <td class="gutter">⋯</td>
          <td><code class="muted">${lines.length} unchanged line(s)</code></td>
        </tr>`;
    }
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const htmlDiffReport = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>HTML Comparison Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0d1117; color: #c9d1d9; padding: 24px; }
    h1 { font-size: 20px; margin-bottom: 6px; color: #fff; }
    .subtitle { font-size: 12px; color: #8b949e; margin-bottom: 20px; }
    .summary {
      display: flex; gap: 16px; margin-bottom: 24px;
    }
    .badge {
      padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 700;
    }
    .badge.added   { background: #1a3a1a; border: 1px solid #3fb950; color: #3fb950; }
    .badge.removed { background: #3a1a1a; border: 1px solid #f85149; color: #f85149; }
    .badge.info    { background: #1a2a3a; border: 1px solid #58a6ff; color: #58a6ff; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    tr.added   { background: #1a3a1a; }
    tr.removed { background: #3a1a1a; }
    tr.context { background: #161b22; }
    td { padding: 3px 10px; vertical-align: top; border-bottom: 1px solid #21262d; }
    td.gutter {
      width: 28px; text-align: center; font-weight: 700; user-select: none;
      color: #8b949e;
    }
    tr.added   td.gutter { color: #3fb950; }
    tr.removed td.gutter { color: #f85149; }
    code { font-family: 'Consolas', monospace; white-space: pre-wrap; word-break: break-all; }
    code.muted { color: #484f58; font-style: italic; }
    .legend { display: flex; gap: 20px; margin-bottom: 14px; font-size: 12px; }
    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 6px; }
    .dot.a { background: #3fb950; }
    .dot.r { background: #f85149; }
    .dot.c { background: #484f58; }
  </style>
</head>
<body>
  <h1>HTML Structure Comparison</h1>
  <p class="subtitle">Before: initial page load &nbsp;→&nbsp; After: post alert interactions &nbsp;|&nbsp; https://demoqa.com/alerts</p>

  <div class="summary">
    <span class="badge added">+ ${addedLines} line(s) added</span>
    <span class="badge removed">− ${removedLines} line(s) removed</span>
    <span class="badge info">≈ ${htmlDiff.length} diff chunks</span>
  </div>

  <div class="legend">
    <span><span class="dot a"></span>Added — present in AFTER, not in BEFORE</span>
    <span><span class="dot r"></span>Removed — present in BEFORE, not in AFTER</span>
    <span><span class="dot c"></span>Unchanged — collapsed for readability</span>
  </div>

  <table>
    <tbody>
      ${diffRows}
    </tbody>
  </table>
</body>
</html>`;

await testInfo.attach('HTML Comparison Report', {
    body: htmlDiffReport,
    contentType: 'text/html'
});

});
