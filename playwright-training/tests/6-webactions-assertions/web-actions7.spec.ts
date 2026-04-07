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

    await test.step('Verify error message "Please enter a username and password."', async () => {
        const errorMessage = await page.locator('p.error');
        const expErrorMessage = "Please enter a username and password.";
        const actualErrorMessage = await errorMessage.textContent();
        await expect(actualErrorMessage).toBe(expErrorMessage);
        await stepScreenshot(page, 'Error Message Verified');
    });

    await test.step('Click on admin page link', async () => {
        const adminPageLink = await page.locator('ul.leftmenu > li >a[href="admin.htm"]');
        await adminPageLink.click();
        await stepScreenshot(page, 'Admin Page Link Clicked');
    });

    await test.step('Select DBA mode as "jdbc"', async () => {
        await selectDbaMode(page, "jdbc");
        await stepScreenshot(page, 'DBA Mode Selected');
    });

    await test.step('Scroll to Loan Provider dropdown', async () => {
        const loanProviderDropdown = await page.locator('select#loanProvider');
        await loanProviderDropdown.scrollIntoViewIfNeeded();
        await stepScreenshot(page, 'Scrolled to Loan Provider');
    });

    await test.step('Select "Web Service" from Loan Provider dropdown', async () => {
        const loanProviderDropdown = await page.locator('select#loanProvider');
        await loanProviderDropdown.selectOption({ label: 'Web Service' });
        await stepScreenshot(page, 'Web Service Selected');
    });

    await test.step('Click on submit button', async () => {
        const submitButton = await page.locator('input[value="Submit"]');
        await submitButton.click();
        await stepScreenshot(page, 'Submit Button Clicked');
    });

    await test.step('Verify submission success message', async () => {
        const successMessage = await page.locator('//div[@id="rightPanel"]//p//b');
        const expectedMessage = "Settings saved successfully.";
        const actualMessage = await successMessage.textContent();
        await expect(actualMessage).toBe(expectedMessage);
        await stepScreenshot(page, 'Success Message Verified');
    });

    await test.step('Click on services page link', async () => {
        const servicesPageLink = await page.locator('//ul[@class="leftmenu"]//a[text()="Services"]');
        await servicesPageLink.click();
        await stepScreenshot(page, 'Services Page Link Clicked');
    });

    await test.step('Verify bookstore services header is visible', async () => {
        const bookstoreServicesHeader = await page.locator('//span[text()="Bookstore services:"]');
        await expect(bookstoreServicesHeader).toBeVisible();
        await stepScreenshot(page, 'Bookstore Services Header Visible');
    });

    await test.step('Scroll down to bookstore services table', async () => {
        const bookstoreServicesHeader = await page.locator('//span[text()="Bookstore services:"]');
        await bookstoreServicesHeader.scrollIntoViewIfNeeded();
        await stepScreenshot(page, 'Scrolled to Bookstore Services Table');
    });

    await test.step('Print bookstore services table data', async () => {
        const rows = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr');
        const totalRows = await rows.count();

        const columns = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[1]//td');
        const totalColumns = await columns.count();

        for (let r: number = 1; r <= totalRows; r++) {
            for (let c: number = 1; c <= totalColumns; c++) {
                const cell = page.locator(`//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[${r}]//td[${c}]`);
                console.log(`Row ${r} Column ${c} value is : ` + await cell.textContent());
            }
        }
        await stepScreenshot(page, 'Table Data Printed');
    });

});

async function selectDbaMode(page: any, mode: string) {
    const dbaModeRadioBtn = page.locator(`input[value="${mode}"]`);
    await dbaModeRadioBtn.click();
}
