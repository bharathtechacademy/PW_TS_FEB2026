import { test, expect } from '@playwright/test';

test('Web Actions - Parabank Login and Services', async ({ page }) => {

    // 1. Launch application using url (https://parabank.parasoft.com/parabank/index.htm)
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    // 2.verify application logo is displayed
    const logo = await page.locator('img.logo');
    await expect(logo).toBeVisible();
    console.log("Logo image is displayed successfully. ")

    // 3.Verify application caption displayed as "Experience the difference"
    const caption = await page.locator('p.caption');
    const expCaption = "Experience the difference";
    const actualCaption =await caption.textContent();
    await expect(actualCaption).toBe(expCaption);
    console.log("caption is displayed as expected.")

    // 4.Enter invalid username
    const usernameTxtb = await page.locator('input[name="username"]');
    await usernameTxtb.clear();
    await usernameTxtb.fill('Invalid User');

    // 5.Enter empty Password
    const passwordTxtb = await page.locator('input[name="password"]');
    await passwordTxtb.fill("");
    console.log("Updated user name and empty password ")

    // 6.Click on login button
    const loginBtn = await page.locator('input[value="Log In"]');
    await loginBtn.click();
    console.log("Clicked on the login button successfully. ")


    // 7.Verify the error message "Please enter a username and password."
    const errorMessage = await page.locator('p.error');
    const expErrorMessage = "Please enter a username and password.";
    const actualErrorMessage = await errorMessage.textContent();
    await expect(actualErrorMessage).toBe(expErrorMessage);
    console.log("Error Message is displayed as expected.")

    // 8.Click on admin page link
    const adminPageLink = await page.locator('ul.leftmenu > li >a[href="admin.htm"]');
    await adminPageLink.click();
    console.log("Click on the admin page link successfully.")

    // 9.select the option "soap" from dba mode radio button
    await selectDbaMode(page, "jdbc");

    // 10.Scroll to Loan Provider dropdown
    const loanProviderDropdown = await page.locator('select#loanProvider');
    await loanProviderDropdown.scrollIntoViewIfNeeded();
    console.log("Scrolled to loan provider dropdown successfully. ")

    // 11.Select the option 'Web Service' from the dropdown
    await loanProviderDropdown.selectOption({label :'Web Service'})
    console.log("Selected the option 'Web Service' from the dropdown successfully. ")

    // 12.click on submit button
    const submitButton = await page.locator('input[value="Submit"]');
    await submitButton.click();

    // 13.verify submission is successful by validating success message
    const successMessage = await page.locator('//div[@id="rightPanel"]//p//b');
    const expectedMessage = "Settings saved successfully.";
    const actualMessage =await successMessage.textContent();
    await expect(actualMessage).toBe(expectedMessage);
    console.log("Submission is successful and expected message is displayed. ")

    // 14.Click on services page link
    const servicesPageLink = await page.locator('//ul[@class="leftmenu"]//a[text()="Services"]');
    await servicesPageLink.click();
    console.log("Clicked on the services page link successfully.")

    // 15.wait for service page
    const bookstoreServicesHeader = await page.locator('//span[text()="Bookstore services:"]');
    await expect(bookstoreServicesHeader).toBeVisible();
    console.log("Bookstore services header is visible and service page is loaded successfully. ");

    // 16.Scroll down till bookstore services table
    await bookstoreServicesHeader.scrollIntoViewIfNeeded();
    console.log("Scrolled down till bookstore services table successfully.");   

    // 17.get total rows of books store services table
    //rows : //span[text()="Bookstore services:"]/following-sibling::table[1]//tr
    //columns : //span[text()="Bookstore services:"]/following-sibling::table[1]//tr[1]//td
    //cell : //span[text()="Bookstore services:"]/following-sibling::table[1]//tr[6]//td[2]
    const rows = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr');
    const totalRows = await rows.count();

    // 18.get total columns of books store services table
    const columns = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[1]//td');
    const totalColumns =await columns.count();

    // 19.Print table data (row wise and column wise data)
    for (let r:number = 1; r<=totalRows ; r++){
        for (let c:number = 1; c<=totalColumns ;c++){
            const cell = page.locator(`//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[${r}]//td[${c}]`);
            console.log(`Row ${r} Column ${c} value is : `+await cell.textContent());
        }
    }

});


async function selectDbaMode(page: any, mode: string) {
    const dbaModeRadioBtn = page.locator(`input[value="${mode}"]`);
    dbaModeRadioBtn.click();
    console.log(`Selected the option ${mode} from dba mode radio button successfully. `)
}


