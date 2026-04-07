# Allure Report Setup Guide for Playwright

A complete baby-step guide to integrating **Allure Reports** into your Playwright test automation project. By the end of this guide, you will have a beautiful, interactive HTML report with step-by-step results and screenshots attached to every step.

---

## Table of Contents

1. [What is Allure Report?](#1-what-is-allure-report)
2. [Prerequisites](#2-prerequisites)
3. [Step 1 -- Install Required Packages](#3-step-1--install-required-packages)
4. [Step 2 -- Configure Playwright to Use Allure Reporter](#4-step-2--configure-playwright-to-use-allure-reporter)
5. [Step 3 -- Add Allure Steps to Your Test Script](#5-step-3--add-allure-steps-to-your-test-script)
6. [Step 4 -- Attach Screenshots to Each Step](#6-step-4--attach-screenshots-to-each-step)
7. [Step 5 -- Add Convenience npm Scripts](#7-step-5--add-convenience-npm-scripts)
8. [Step 6 -- Run the Tests](#8-step-6--run-the-tests)
9. [Step 7 -- Generate the Allure Report](#9-step-7--generate-the-allure-report)
10. [Step 8 -- View the Allure Report](#10-step-8--view-the-allure-report)
11. [Understanding the Allure Report](#11-understanding-the-allure-report)
12. [Complete Example -- Before and After](#12-complete-example--before-and-after)
13. [Bonus -- Additional Allure Features](#13-bonus--additional-allure-features)
14. [Troubleshooting](#14-troubleshooting)
15. [Quick Reference -- Cheat Sheet](#15-quick-reference--cheat-sheet)

---

## 1. What is Allure Report?

Allure Report is an open-source, lightweight, and flexible test reporting tool. It produces beautiful, interactive HTML reports that show:

- **Test results** with pass/fail status
- **Step-by-step breakdown** of each test
- **Screenshots, videos, and attachments** embedded in the report
- **History and trends** across multiple test runs
- **Categories and suites** for organizing tests

Unlike the default Playwright HTML report, Allure gives you granular step-level visibility with rich attachment support.

---

## 2. Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool        | Minimum Version | How to Check         |
| ----------- | --------------- | -------------------- |
| **Node.js** | v18 or higher   | `node --version`     |
| **npm**     | v9 or higher    | `npm --version`      |
| **Java**    | JDK 8 or higher | `java -version`      |

> **Why Java?** The Allure command-line tool is built on Java. You need Java installed to generate and serve the HTML report. Download it from [https://adoptium.net](https://adoptium.net) if you don't have it.

You should also have an existing Playwright project. If not, create one:

```bash
npm init playwright@latest
```

---

## 3. Step 1 -- Install Required Packages

Open your terminal, navigate to your Playwright project folder, and install these three packages:

```bash
npm install allure-playwright allure-js-commons allure-commandline --save-dev
```

Here's what each package does:

| Package               | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| `allure-playwright`   | The Allure reporter plugin that integrates with Playwright     |
| `allure-js-commons`   | Provides the JavaScript API for attachments, labels, and steps |
| `allure-commandline`  | CLI tool to generate and open the Allure HTML report           |

After installation, your `devDependencies` in `package.json` should include:

```json
"devDependencies": {
    "@playwright/test": "^1.58.2",
    "allure-commandline": "^2.38.1",
    "allure-js-commons": "^3.6.0",
    "allure-playwright": "^3.6.0"
}
```

---

## 4. Step 2 -- Configure Playwright to Use Allure Reporter

Open your `playwright.config.ts` file and update the `reporter` property.

### Before (default Playwright reporter):

```typescript
reporter: 'html',
```

### After (adding Allure alongside HTML):

```typescript
reporter: [
    ['html'],
    ['allure-playwright'],
],
```

> **Tip:** We keep `['html']` so you still get the default Playwright report. The `['allure-playwright']` reporter runs in parallel and writes Allure result files to an `allure-results/` folder.

### Full `playwright.config.ts` Example:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1 : 1,

    // Add Allure reporter here
    reporter: [
        ['html'],
        ['allure-playwright'],
    ],

    use: {
        trace: 'on',
        video: 'on',
        screenshot: 'on',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
```

---

## 5. Step 3 -- Add Allure Steps to Your Test Script

Allure steps are the heart of step-by-step reporting. You use Playwright's built-in `test.step()` method to wrap each logical action in your test.

### Syntax:

```typescript
await test.step('Description of the step', async () => {
    // Your test actions go here
});
```

### How to Convert a Regular Test to Use Steps:

#### Before (no steps):

```typescript
import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {
    await page.goto("https://example.com");

    const username = page.locator('#username');
    await username.fill('testuser');

    const password = page.locator('#password');
    await password.fill('password123');

    const loginBtn = page.locator('#loginBtn');
    await loginBtn.click();

    const welcome = page.locator('.welcome-message');
    await expect(welcome).toBeVisible();
});
```

#### After (with Allure steps):

```typescript
import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await test.step('Navigate to application', async () => {
        await page.goto("https://example.com");
    });

    await test.step('Enter username', async () => {
        const username = page.locator('#username');
        await username.fill('testuser');
    });

    await test.step('Enter password', async () => {
        const password = page.locator('#password');
        await password.fill('password123');
    });

    await test.step('Click login button', async () => {
        const loginBtn = page.locator('#loginBtn');
        await loginBtn.click();
    });

    await test.step('Verify welcome message is displayed', async () => {
        const welcome = page.locator('.welcome-message');
        await expect(welcome).toBeVisible();
    });
});
```

### Key Rules for Steps:

1. **Every step must use `await`** -- Always write `await test.step(...)`.
2. **Steps must have a clear description** -- This text appears in the Allure report.
3. **Steps can be nested** -- You can put `test.step()` inside another `test.step()`.
4. **If a step fails, the report marks it as failed** -- Making it easy to see exactly which step broke.

---

## 6. Step 4 -- Attach Screenshots to Each Step

This is where Allure shines. You can attach a screenshot at the end of each step so the report shows exactly what the browser looked like at that point.

### 6.1 Import the Allure API

At the top of your test file, add this import:

```typescript
import * as allure from 'allure-js-commons';
```

### 6.2 Create a Reusable Screenshot Helper

Add this helper function at the top of your file (before the tests) or in a separate utility file:

```typescript
async function stepScreenshot(page: any, name: string) {
    const screenshot = await page.screenshot({ fullPage: false });
    await allure.attachment(name, screenshot, 'image/png');
}
```

**What this does:**

| Line                                          | Explanation                                               |
| --------------------------------------------- | --------------------------------------------------------- |
| `page.screenshot({ fullPage: false })`        | Captures a screenshot of the current viewport as a Buffer |
| `allure.attachment(name, screenshot, 'image/png')` | Attaches the Buffer to the Allure report as a PNG image  |

> **Options for `page.screenshot()`:**
>
> - `{ fullPage: false }` -- captures only the visible viewport (default)
> - `{ fullPage: true }` -- captures the entire scrollable page

### 6.3 Call the Helper at the End of Each Step

```typescript
await test.step('Navigate to application', async () => {
    await page.goto("https://example.com");
    await stepScreenshot(page, 'Application Launched');  // <-- add this
});

await test.step('Enter username', async () => {
    const username = page.locator('#username');
    await username.fill('testuser');
    await stepScreenshot(page, 'Username Entered');  // <-- add this
});
```

Each call to `stepScreenshot()` creates a PNG attachment in the Allure report under that specific step. In the final report, you can click on any step to expand it and view the screenshot.

### 6.4 Other Attachment Types

Allure supports many attachment types beyond screenshots:

```typescript
// Attach plain text
await allure.attachment('Log Output', 'Some text content', 'text/plain');

// Attach JSON data
await allure.attachment('API Response', JSON.stringify(data, null, 2), 'application/json');

// Attach HTML content
await allure.attachment('Page HTML', htmlContent, 'text/html');
```

---

## 7. Step 5 -- Add Convenience npm Scripts

Open your `package.json` and add these scripts to the `"scripts"` section:

```json
"scripts": {
    "test:allure": "playwright test tests/6-webactions-assertions/web-actions7.spec.ts --headed",
    "allure:generate": "npx allure generate allure-results --clean -o allure-report",
    "allure:open": "npx allure open allure-report",
    "allure:serve": "npx allure serve allure-results"
}
```

### What Each Script Does:

| Script             | Command                                    | Purpose                                                    |
| ------------------ | ------------------------------------------ | ---------------------------------------------------------- |
| `test:allure`      | `playwright test ... --headed`             | Runs the Playwright test (headed mode so you can watch)    |
| `allure:generate`  | `allure generate allure-results --clean`   | Converts raw JSON results into an HTML report              |
| `allure:open`      | `allure open allure-report`                | Opens the generated HTML report in your default browser    |
| `allure:serve`     | `allure serve allure-results`              | Generates + opens in one step (temporary server)           |

> **The `--clean` flag** in `allure:generate` deletes the previous report before generating a new one, so you always see fresh results.

---

## 8. Step 6 -- Run the Tests

Now it's time to run your test! Open your terminal and execute:

```bash
npm run test:allure
```

**What happens behind the scenes:**

1. Playwright launches the browser and runs your test.
2. The `allure-playwright` reporter captures every `test.step()` and its result.
3. Your `stepScreenshot()` calls capture and attach screenshots.
4. All results are written as JSON + PNG files into the `allure-results/` folder.

You should see output similar to:

```
Running 1 test using 1 worker

  1 passed (18.0s)
```

After the test finishes, verify the `allure-results/` folder exists:

```bash
ls allure-results/
```

You should see files like:

```
02fd2ade-...-attachment.png       (screenshot attachments)
318b2701-...-result.json          (test result data)
49311123-...-attachment.webm      (video recording)
148bba6e-...-attachment.txt       (trace data)
```

---

## 9. Step 7 -- Generate the Allure Report

The `allure-results/` folder contains raw data. You need to generate the HTML report from it:

```bash
npm run allure:generate
```

This creates an `allure-report/` folder containing the full interactive HTML report.

Expected output:

```
Report successfully generated to allure-report
```

---

## 10. Step 8 -- View the Allure Report

Open the generated report in your browser:

```bash
npm run allure:open
```

This starts a local web server and opens the report. You'll see output like:

```
Starting web server...
Server started at http://127.0.0.1:62000. Press <Ctrl+C> to exit
```

### Shortcut -- Generate and View in One Command:

If you want to skip the separate generate step, use:

```bash
npm run allure:serve
```

This generates a temporary report from `allure-results/` and immediately opens it in your browser.

---

## 11. Understanding the Allure Report

Once the report opens in your browser, here's what you'll see:

### 11.1 Overview Page

The landing page shows:

- **Total tests run** and their pass/fail/skip counts
- **Pie chart** with status distribution
- **Trend graph** (if you have history from multiple runs)
- **Suites and categories** breakdown

### 11.2 Suites Tab

Click on **Suites** in the left sidebar to see your test organized by file and test name.

### 11.3 Test Case Detail (Steps + Screenshots)

Click on any test case name to open its detail view. You will see:

```
Test body
  ├── Launch Parabank application           ✅  [📎 Screenshot]
  ├── Verify application logo is displayed  ✅  [📎 Screenshot]
  ├── Verify caption "Experience the..."    ✅  [📎 Screenshot]
  ├── Enter invalid username                ✅  [📎 Screenshot]
  ├── Enter empty password                  ✅  [📎 Screenshot]
  ├── Click on login button                 ✅  [📎 Screenshot]
  ├── Verify error message                  ✅  [📎 Screenshot]
  ├── Click on admin page link              ✅  [📎 Screenshot]
  ...
```

- **Green checkmark (✅)** = step passed
- **Red cross (❌)** = step failed (with error details)
- **Paperclip icon (📎)** = click to expand and view the attached screenshot

### 11.4 Attachments Panel

When you expand a step, the attachments section shows:

- **Screenshots** -- inline PNG images showing browser state at that step
- **Video** -- the full test recording (if `video: 'on'` is set in config)
- **Trace** -- Playwright trace file (if `trace: 'on'` is set in config)

---

## 12. Complete Example -- Before and After

### BEFORE: Regular Playwright Test (No Allure)

```typescript
import { test, expect } from '@playwright/test';

test('Web Actions - Parabank Login and Services', async ({ page }) => {

    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    const logo = await page.locator('img.logo');
    await expect(logo).toBeVisible();
    console.log("Logo image is displayed successfully.");

    const caption = await page.locator('p.caption');
    const expCaption = "Experience the difference";
    const actualCaption = await caption.textContent();
    await expect(actualCaption).toBe(expCaption);
    console.log("Caption is displayed as expected.");

    const usernameTxtb = await page.locator('input[name="username"]');
    await usernameTxtb.clear();
    await usernameTxtb.fill('Invalid User');

    const passwordTxtb = await page.locator('input[name="password"]');
    await passwordTxtb.fill("");

    const loginBtn = await page.locator('input[value="Log In"]');
    await loginBtn.click();

    const errorMessage = await page.locator('p.error');
    const expErrorMessage = "Please enter a username and password.";
    const actualErrorMessage = await errorMessage.textContent();
    await expect(actualErrorMessage).toBe(expErrorMessage);
    console.log("Error Message is displayed as expected.");
});
```

### AFTER: Same Test with Allure Steps + Screenshots

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

async function stepScreenshot(page: any, name: string) {
    const screenshot = await page.screenshot({ fullPage: false });
    await allure.attachment(name, screenshot, 'image/png');
}

test('Web Actions - Parabank Login and Services', async ({ page }) => {

    await test.step('Launch Parabank application', async () => {
        await page.goto("https://parabank.parasoft.com/parabank/index.htm");
        await stepScreenshot(page, 'Launch Application');
    });

    await test.step('Verify application logo is displayed', async () => {
        const logo = await page.locator('img.logo');
        await expect(logo).toBeVisible();
        await stepScreenshot(page, 'Logo Visible');
    });

    await test.step('Verify caption "Experience the difference"', async () => {
        const caption = await page.locator('p.caption');
        const expCaption = "Experience the difference";
        const actualCaption = await caption.textContent();
        await expect(actualCaption).toBe(expCaption);
        await stepScreenshot(page, 'Caption Verified');
    });

    await test.step('Enter invalid username', async () => {
        const usernameTxtb = await page.locator('input[name="username"]');
        await usernameTxtb.clear();
        await usernameTxtb.fill('Invalid User');
        await stepScreenshot(page, 'Invalid Username Entered');
    });

    await test.step('Enter empty password', async () => {
        const passwordTxtb = await page.locator('input[name="password"]');
        await passwordTxtb.fill("");
        await stepScreenshot(page, 'Empty Password Entered');
    });

    await test.step('Click on login button', async () => {
        const loginBtn = await page.locator('input[value="Log In"]');
        await loginBtn.click();
        await stepScreenshot(page, 'Login Button Clicked');
    });

    await test.step('Verify error message', async () => {
        const errorMessage = await page.locator('p.error');
        const expErrorMessage = "Please enter a username and password.";
        const actualErrorMessage = await errorMessage.textContent();
        await expect(actualErrorMessage).toBe(expErrorMessage);
        await stepScreenshot(page, 'Error Message Verified');
    });
});
```

---

## 13. Bonus -- Additional Allure Features

### 13.1 Add Test Description

```typescript
import * as allure from 'allure-js-commons';

test('My Test', async ({ page }) => {
    await allure.description('This test verifies the login flow with invalid credentials.');

    // ... steps
});
```

### 13.2 Add Severity Label

```typescript
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test('My Test', async ({ page }) => {
    await allure.severity(Severity.CRITICAL);

    // ... steps
});
```

Available severity levels: `BLOCKER`, `CRITICAL`, `NORMAL`, `MINOR`, `TRIVIAL`.

### 13.3 Add Feature and Story Labels (BDD-Style)

```typescript
test('My Test', async ({ page }) => {
    await allure.feature('Login');
    await allure.story('Invalid Login');

    // ... steps
});
```

These labels help organize tests in the **Behaviors** tab of the Allure report.

### 13.4 Add Owner and Tags

```typescript
test('My Test', async ({ page }) => {
    await allure.owner('QA Team');
    await allure.tag('smoke');
    await allure.tag('regression');

    // ... steps
});
```

### 13.5 Add Links (Issue Tracker / TMS)

```typescript
test('My Test', async ({ page }) => {
    await allure.issue('BUG-123', 'https://jira.example.com/browse/BUG-123');
    await allure.tms('TC-456', 'https://testmanagement.example.com/case/TC-456');

    // ... steps
});
```

### 13.6 Add Environment Info

Create a file named `environment.properties` inside the `allure-results/` folder:

```properties
Browser=Chromium
Environment=QA
URL=https://parabank.parasoft.com
OS=Windows 10
Node.js=v22.x
```

This information will appear on the Allure report's **Overview** page under the **Environment** widget.

### 13.7 Nested Steps

You can nest steps within steps for more granular reporting:

```typescript
await test.step('Login with invalid credentials', async () => {

    await test.step('Enter username', async () => {
        await page.locator('#username').fill('baduser');
        await stepScreenshot(page, 'Username Entered');
    });

    await test.step('Enter password', async () => {
        await page.locator('#password').fill('badpass');
        await stepScreenshot(page, 'Password Entered');
    });

    await test.step('Submit form', async () => {
        await page.locator('#submit').click();
        await stepScreenshot(page, 'Form Submitted');
    });
});
```

---

## 14. Troubleshooting

### Problem: `allure: command not found`

**Cause:** Java is not installed, or the allure-commandline package is not installed.

**Fix:**

```bash
# Check Java
java -version

# Reinstall allure-commandline
npm install allure-commandline --save-dev
```

### Problem: `allure-results/` folder is empty

**Cause:** The Allure reporter is not configured in `playwright.config.ts`.

**Fix:** Make sure your config has:

```typescript
reporter: [
    ['html'],
    ['allure-playwright'],
],
```

### Problem: Screenshots not appearing in the report

**Cause:** Missing `import * as allure from 'allure-js-commons'` or the `stepScreenshot()` function is not being called.

**Fix:** Verify these two things:

1. The import is at the top of your file:

   ```typescript
   import * as allure from 'allure-js-commons';
   ```

2. Each step calls `stepScreenshot()`:

   ```typescript
   await test.step('My Step', async () => {
       // ... actions
       await stepScreenshot(page, 'Screenshot Name');
   });
   ```

### Problem: Old results mixing with new results

**Cause:** The `allure-results/` folder still has files from a previous run.

**Fix:** Delete it before running tests:

```bash
# Windows PowerShell
Remove-Item -Recurse -Force allure-results

# Mac/Linux
rm -rf allure-results
```

Or use `--clean` when generating (already included in our npm script):

```bash
npx allure generate allure-results --clean -o allure-report
```

---

## 15. Quick Reference -- Cheat Sheet

### Installation

```bash
npm install allure-playwright allure-js-commons allure-commandline --save-dev
```

### Config (`playwright.config.ts`)

```typescript
reporter: [
    ['html'],
    ['allure-playwright'],
],
```

### Test File Imports

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
```

### Screenshot Helper

```typescript
async function stepScreenshot(page: any, name: string) {
    const screenshot = await page.screenshot({ fullPage: false });
    await allure.attachment(name, screenshot, 'image/png');
}
```

### Step Pattern

```typescript
await test.step('Step description', async () => {
    // actions...
    await stepScreenshot(page, 'Screenshot Name');
});
```

### Run Commands

```bash
# Step 1: Run the test
npm run test:allure

# Step 2: Generate the report
npm run allure:generate

# Step 3: Open the report
npm run allure:open

# Or do Steps 2+3 in one command
npm run allure:serve
```

### Folder Structure After Running

```
your-project/
├── allure-results/          <-- Raw test data (JSON + attachments)
│   ├── xxx-result.json
│   ├── xxx-attachment.png
│   └── xxx-attachment.webm
├── allure-report/           <-- Generated HTML report
│   ├── index.html
│   └── ...
├── playwright.config.ts
├── package.json
└── tests/
    └── your-test.spec.ts
```

---

**Happy Testing!** 🎯
