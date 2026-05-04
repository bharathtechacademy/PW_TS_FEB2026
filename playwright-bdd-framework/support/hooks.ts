import type { Browser, BrowserContext, Page } from "@playwright/test";
import { chromium } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds

let browser: Browser;
let context: BrowserContext;
let page: Page;

//Method to launch browser engine at the very beginning of execution. 
BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

//Method to close the browser engine at the very end of execution. 
AfterAll(async function () {
    await browser.close();
});

//Method to create a new browser context and page for each and every scenario. 
Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    this.page = page; // Make the page object available in the World context
    this.initializePageObject(); // Initialize page objects
});

//Method to close the browser context and page after each scenario. 
After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await page.screenshot({ path: `screenshots/${scenario.pickle.name}.png` });
        await this.attach(screenshot, "image/png");
    }
    await page.close();
    await context.close();
});