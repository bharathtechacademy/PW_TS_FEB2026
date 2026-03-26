import { chromium, test , expect} from '@playwright/test';


test('Browser actions', async ({  }) => {

    //Launch the Chrome browser engine
    const browserEngine = await chromium.launch({channel: 'chrome', headless: false}); //msedge

    //Within the browser engine, now launch the new browser context /incognito window
    const browserContext = await browserEngine.newContext();

    //Clear cookies
    await browserContext.clearCookies();

    //Within the browser context, now launch the new page / tab
    const page = await browserContext.newPage();

    //Maximize the browser window to a specific resolution. (1920 * 1080)
    await page.setViewportSize({ width: 1920, height: 1080 });

    //Launch the application by using URL www.google.com. 
    await page.goto("https://www.google.com");

    //Verify the application launched successfully by using application title
    await expect(page).toHaveTitle('Google');

    //Launch a new URL "https://playwright.dev" within the same page 
    await page.goto("https://playwright.dev");

    //Go back to previous application Google. 
    await page.goBack();

    //Go forward to Playwright page.
    await page.goForward();

    //Refresh the Playwright page.
    await page.reload();

    //Launch the new tab within the same browser. 
    const newPage = await browserContext.newPage();

    //Launch the new application with the URL https://www.selenium.dev
    await newPage.goto('https://www.selenium.dev');

    //Go back to the previous tab and display Playwright application. 
    await page.bringToFront();

    //Copy the current URL from the browser and print the same. 
    let currentUrl = await page.url();
    console.log(currentUrl);

    //Close the current page. 
    await page.close();

    //Close all pages or tabs. 
    await browserEngine.close();

});