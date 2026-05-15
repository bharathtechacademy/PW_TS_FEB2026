# Copilot prompt: bootstrap a Playwright TDD framework (clone of this pattern)

Use this document as the **single source of instructions** when generating a new test automation codebase for a **different web application**, while keeping the **same architecture, naming, and layering** as the reference Playwright TDD framework. Prefer **TypeScript**, **ES modules** (`"type": "module"`), and **Playwright Test** (`@playwright/test`).

---

## 1. Goal

- Scaffold a maintainable **UI-first TDD-style** Playwright project for **{NEW_APP_NAME}**.
- Reuse the **page object pattern** split into **JSON locators** + **TypeScript step classes** + **shared UI commons**.
- Optionally include **API** and **DB** commons in the same style if the app needs them.
- Wire **Playwright MCP** (`@playwright/mcp`) in the editor so Copilot / agents can **explore the live app**, capture **selectors and flows**, and align generated tests with real UI behavior.

Replace placeholders in braces (for example `{NEW_APP_NAME}`, `{BASE_URL}`) with the real application values before or during generation.

---

## 2. Repository layout (must match)

Create the following top-level structure:

```text
{repo-root}/
├── commons/
│   ├── ui/
│   │   └── web-commons.ts          # Shared Playwright interactions (click, fill, visibility, etc.)
│   ├── api/
│   │   └── api-commons.ts          # Optional: APIRequestContext wrapper + assertions
│   └── db/
│       └── DBCommons.ts            # Optional: pg client wrapper for DB checks
├── config/
│   └── config.json                 # Non-secret app URLs/titles; secrets via env (see §8)
├── page-objects/
│   ├── page-elements/              # One JSON file per page/area: string CSS/XPath locators only
│   │   └── {feature}-page-elements.json
│   └── page-steps/                 # One TS class per page/area: user-facing "steps"
│       └── {feature}-page-steps.ts
├── testdata/
│   ├── ui/
│   │   └── data.json               # UI test data; keys may match test titles (see §5)
│   ├── api/
│   │   └── data.json
│   └── db/
│       └── data.json
├── tests/
│   ├── ui/
│   │   └── {area}-tests.spec.ts    # Specs orchestrate steps only; no raw locators in specs
│   ├── api/
│   │   └── api-tests.spec.ts
│   └── load/                       # Optional: JMeter + Playwright glue if load testing is required
├── utils/                          # Optional helpers (PDF, Excel, barcode, OCR, etc.) only if needed
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── mcp.json                        # Root MCP server definition (some teams duplicate under .vscode)
└── .vscode/
    └── mcp.json                    # Optional: same Playwright MCP entry for Cursor/VS Code
```

Do **not** commit `node_modules/`, `test-results/`, `playwright-report/`, or `.env` files.

---

## 3. Layering rules (strict)

| Layer | Responsibility | Allowed imports |
|--------|----------------|-----------------|
| **Specs** (`tests/**/*.spec.ts`) | Arrange scenarios, call step methods, load JSON test data, use `test.describe` / `beforeEach` | `@playwright/test`, `page-objects/...`, `testdata/...` |
| **Page steps** (`page-objects/page-steps/*.ts`) | Named user actions and verifications for one page or feature | `@playwright/test` `Page`, `commons/ui/web-commons`, matching `page-elements/*.json`, `config/config.json` for URLs/titles |
| **Page elements** (`page-objects/page-elements/*.json`) | Locator strings only (CSS, XPath, `text=` patterns) | None (JSON) |
| **Web commons** | Generic low-level operations: `goto`, scroll, click, fill, visibility, text compare, etc. | `@playwright/test` |

**Naming convention**

- Elements file: `{feature}-page-elements.json` (kebab-case feature name).
- Steps class: `{Feature}PageSteps` in `{feature}-page-steps.ts` (PascalCase + `PageSteps` suffix).

---

## 4. `package.json` (scripts and dependencies pattern)

- `"type": "module"`.
- DevDependencies: `@playwright/test`, `@types/node` (versions aligned with current stable Playwright).
- Scripts (minimum):

  ```json
  {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:report": "playwright show-report",
    "ui": "playwright test tests/ui --headed",
    "api": "playwright test tests/api/api-tests.spec.ts"
  }
  ```

- Add **optional** runtime dependencies only when needed: `pg`, `xlsx`, `pdf-parse`, `tesseract.js`, `@zxing/library`, etc. (do not add unused packages).

---

## 5. Spec file conventions

- Use `test.describe` for a feature area.
- In `test.beforeEach`, instantiate all `*PageSteps` classes needed for that file with `{ page }`.
- **Test titles** should be readable and stable; when binding data from `testdata/ui/data.json`, use either:
  - explicit keys, or
  - `testInfo.title` as key **only if** the JSON keys match the full test title exactly (same pattern as the reference framework).
- Specs should read like **Given / When / Then** sequences of step methods (for example `await loginPage.launchtheApplication()` then `await homePage.verifyHomePageIsDisplayed()`).
- Import JSON with **import attributes**: `import data from '../../testdata/ui/data.json' with { type: 'json' };`

---

## 6. Page steps class template

Each steps class:

1. Imports its locators JSON: `import fooPage from '../page-elements/foo-page-elements.json' with { type: 'json' };`
2. Holds `page: Page` and `web: WebCommons`.
3. Constructor: `this.web = new WebCommons(page);`
4. Exposes **async** methods named by behavior (`verifyXIsDisplayed`, `clickOnY`, `enterZ`), delegating to `this.web.*` with locator keys from JSON (for example `fooPage.submitButton`).

Application URL and optional document title: read from `config/config.json` (`app.url`, `app.title`) inside the steps class that owns `launchtheApplication` (or a dedicated `AppSteps` if you prefer).

---

## 7. `WebCommons` responsibilities (replicate API surface)

Implement `commons/ui/web-commons.ts` with a `WebCommons` class that wraps `Page` and provides at least:

- `element(locator: string)`, `elements(locator, locatorType)` for `getByText` / `getByLabel` / `getByPlaceholder` / `getByAltText` / `getByTitle`
- `launchApplication(url, title?)` using `page.goto` and optional `expect(page).toHaveTitle`
- `scrollToElement`, `clickElement`, `doubleClickElement`, `rightClickElement`, `hoverElement`, `forceClickElement`
- `clearText`, `enterText`, `getText`, `pressKey`, `selectOption`
- `getElementText`, `getElementAttribute`, `uploadFile`
- `isElementVisible`, `isElementEnabled`, `isElementDisappeared`
- `handleAlert`, `takeScreenshot`, `compareText`, `verifyElementText`

Use `@playwright/test` `expect` for visibility/hidden assertions. Keep method signatures consistent across projects so steps classes are portable.

---

## 8. Configuration and secrets

- `config/config.json` should hold **environment-specific but non-secret** values: `app.url`, `app.title`, public API base URLs, feature flags.
- **Never** store passwords, API bearer tokens, or private keys in JSON committed to git. Use:
  - `.env` + `dotenv` in `playwright.config.ts`, **or**
  - CI/CD secret variables mapped into `process.env` at run time.
- Reference secrets in code via `process.env.MY_SECRET` and document required variable names in a short `README` section (optional) or in this spec for your team.

---

## 9. `playwright.config.ts` expectations

- `testDir: './tests'`
- `fullyParallel: true`, `forbidOnly: !!process.env.CI`, `retries` and `workers` tuned for CI vs local (reference uses `workers: 1` for stability; adjust if the new app allows parallelism).
- `reporter: 'html'` (or add `list` for CI logs).
- `use.trace: 'on-first-retry'` (or `on` while stabilizing new tests).
- `projects`: at least **chromium** with `devices['Desktop Chrome']`.
- Uncomment or add `baseURL` and `webServer` when the new app is served locally.

---

## 10. `tsconfig.json` expectations

- `"module": "nodenext"`, `"target": "esnext"`, `"strict": true`, `"noEmit": true`, `"allowImportingTsExtensions": true`, `"types": ["node"]`, `"skipLibCheck": true`, and other strict flags as in the reference project.

---

## 11. Playwright MCP: setup and how Copilot should use it

### 11.1 Install / declare MCP server

Add an MCP server entry that runs the official Playwright MCP package (stdio):

**`mcp.json` (root)** and optionally **`.vscode/mcp.json`**:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

For VS Code / Cursor schema variants, mirror the same `command` / `args` under the host’s expected wrapper key (`mcpServers` vs `servers` per product docs).

### 11.2 Workflow for automating `{NEW_APP_NAME}`

1. **Discover** flows in the real app using MCP (navigate, snapshot DOM, try actions). Prefer resilient selectors: `getByRole`, `getByLabel`, stable `data-testid` if the app team adds them.
2. **Translate** stable locators into `page-elements/*.json` as strings (XPath/CSS/text selectors as used in the reference framework).
3. **Implement** `page-steps` methods that call `WebCommons` only.
4. **Author** `tests/ui/*.spec.ts` that compose steps; keep **no locators** in spec files.
5. **Record** dynamic test inputs in `testdata/ui/data.json`; keep secrets out of JSON.
6. **Iterate** with headed runs: `npm run ui` or `npx playwright test tests/ui --headed`.

### 11.3 Division of labor

- **MCP**: exploration, selector validation, reproducing bugs, drafting flows.
- **Playwright Test suite**: deterministic CI-ready tests using the layered framework above.

---

## 12. API and DB layers (optional, same style)

- **API**: `commons/api/api-commons.ts` using `request.newContext` from `@playwright/test` with `baseURL` and headers from env-backed config; specs in `tests/api/api-tests.spec.ts`; payloads and expectations in `testdata/api/data.json`.
- **DB**: `commons/db/DBCommons.ts` using `pg` `Client`; connection fields from env; queries and expected shapes driven by tests or `testdata/db/data.json`.

---

## 13. Deliverables checklist for Copilot

When generation is complete, the repo must:

- [ ] Install and run: `npm install` then `npx playwright install`
- [ ] Contain at least one **smoke** UI spec proving launch + one main happy path for `{NEW_APP_NAME}`
- [ ] Contain matching `page-elements` + `page-steps` for every page touched in that smoke path
- [ ] Use `WebCommons` for all UI interactions from steps classes
- [ ] Keep credentials and tokens out of git; use env vars
- [ ] Include Playwright MCP config (`mcp.json` / `.vscode/mcp.json`) for editor-assisted automation
- [ ] Pass `npx playwright test` locally against `{BASE_URL}` (or documented mock)

---

## 14. Application-specific inputs (fill before sharing with Copilot)

| Field | Value |
|--------|--------|
| Application name | `{NEW_APP_NAME}` |
| Base URL(s) | `{BASE_URL}` |
| Auth type (form / SSO / MFA) | `{AUTH}` |
| Main user journeys to automate first | `{JOURNEYS}` |
| Environments (dev/stage/prod) | `{ENVS}` |
| Test data rules (PII, dynamic emails) | `{DATA_RULES}` |
| Browsers / projects needed | `{BROWSERS}` |

---

## 15. Reference philosophy (one paragraph)

This framework treats **JSON locator maps** as the single place UI selectors change, **step classes** as the vocabulary testers and specs share, and **specs** as readable scenarios. Playwright MCP accelerates **discovery and selector hardening** for a new application without replacing the need for a **structured, CI-friendly** test tree.
