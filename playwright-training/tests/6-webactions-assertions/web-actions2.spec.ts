import { test, expect } from '@playwright/test';

test('Web Actions - Practice Form', async ({ page }) => {

    // 1. Enter URL and Launch the application (https://demoqa.com/automation-practice-form)
    page.goto("https://demoqa.com/automation-practice-form");

    // 2. Wait for Page-load
    const formHeader = page.locator('h1.text-center');
    await expect(formHeader).toBeVisible();

    // 3. Enter First name and Last name
    const firstNameTextbox = page.locator('input#firstName');
    const lastNameTextbox = page.locator('input#lastName');

    await firstNameTextbox.fill("Bharath");
    await lastNameTextbox.fill("Reddy");

    // 4. Enter Email
    const emailTextbox = page.locator('input#userEmail');
    await emailTextbox.fill("BharathTechAcademy@gmail.com");

    // 5. Select Gender (Male)
    await selectGender(page, "Male");

    // 6. Enter mobile number
    const mobileTextbox = page.locator('input#userNumber');
    await mobileTextbox.fill("9553220022");

    // 7.Select DOB (1-Feb-1991)
    await selectDOB(page, "1", "February", "1991");

    // 8.Search and Select 'Computer Science' and 'English'
    const subjects: string[] = ["Computer Science", "English"];
    await selectSubjects(page, subjects);

    // 9.Select Hobbies as Sports and Reading
    const hobbies: string[] = ["Sports", "Reading"];
    await selectHobbies(page, hobbies);

    // 10.Upload photo
    const uploadPhoto = page.locator('input#uploadPicture');
    const filePath = "files/Photo.png";
    await uploadPhoto.setInputFiles(filePath);

    //11. Select state
    const stateListbox = page.locator('input#react-select-3-input');
    await stateListbox.fill('Rajasthan');
    await stateListbox.press('Enter');

    // 11.Submit Details
    const submitButton = page.locator('button#submit');
    submitButton.click();

});

async function selectGender(page: any, option: string) {
    const gender = page.locator(`input[value="${option}"]`);
    await gender.check();
}

async function selectDOB(page: any, date: string, month: string, year: string) {

    //Launch the calendar
    const calendar = page.locator('input#dateOfBirthInput');
    await calendar.click();

    //select the month value
    const monthDropdown = page.locator('select.react-datepicker__month-select');
    await monthDropdown.selectOption({ label: month });

    //select the year value
    const yearDropdown = page.locator('select.react-datepicker__year-select');
    await yearDropdown.selectOption({ label: year });

    //select the date
    const dateElement = page.locator(`//div[text()="${date}" and contains(@aria-label,"${month}")]`);
    await dateElement.click();

}

async function selectSubjects(page: any, subjects: string[]) {

    //Locate the subject input box and click on it
    const subjectContainer = page.locator('div[class *="subjects-auto-complete__input-container"]');
    await subjectContainer.click();

    //Locate the subject input internal container
    const subjectInput = page.locator('input#subjectsInput');

    //Select the subjects
    for (let subject of subjects) {

        //fill the subject
        await subjectInput.fill(subject);

        //press 'Enter' button
        await subjectInput.press('Enter');

    }
}

async function selectHobbies(page: any, hobbies: string[]) {

    for (let hobby of hobbies) {
        const hobbyCheckbox = page.locator(`//label[text()="${hobby}"]/preceding-sibling::input`);
        await hobbyCheckbox.check();
    }

}