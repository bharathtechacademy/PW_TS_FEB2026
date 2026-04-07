import { test, expect } from '@playwright/test';

test('Web Actions - Handling Alerts', async ({ page }) => {

// 1. Enter URL and Launch the application (https://demoqa.com/alerts)
await page.goto('https://demoqa.com/alerts');

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

});
