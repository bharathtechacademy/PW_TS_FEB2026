import { test, expect } from '@playwright/test';

test('Web Actions with Assertions', async ({ page }) => {

    //Launch the application
    await page.goto('https://example.com');

    //Locate the element
    const element = page.locator('#element-id');

    /* =====================================================
    Common Web Element Validations
   ==================================================== */

    //Check if the element is visible. 
    await expect(element).toBeVisible();

    //Check if element is enabled. 
    await expect(element).toBeEnabled();

    //Check if the checkbox is checked already. 
    await expect(element).toBeChecked();

    //Check if the element is hidden /disappeared
    await expect(element).toBeHidden();

    /* =====================================================
 Button Element Validations
==================================================== */

    //Locate the button element
    const button = page.locator('#button');

    //extract the label of the button
    const buttonLabelText = await button.textContent();//If label is added as a text value 
    const buttonLabelValue = await button.getAttribute('value');//If label is added as an attribute value

    //Check the label of the button. 
    await expect(button).toHaveText('Log In');//Validating the label added as a text value 
    await expect(button).toHaveAttribute('value');//Validating attribute is present. 
    await expect(button).toHaveAttribute('value', 'Log In');//Validating attribute and its value are present. 

    //Click on the button
    await button.click();

    //Double-click on the button
    await button.dblclick();

    //Right click on the
    await button.click({ button: 'right' });

    //Mouse over the button
    await button.hover();

    //Scroll till the button is displayed if the button is available somewhere at the bottom of the screen
    await button.scrollIntoViewIfNeeded();

    //Force click on the button
    await button.click({ force: true });

    /* =====================================================
 Textbox Element Validations
==================================================== */

    //Locate the textbox element
    const textbox = page.locator('#textbox');

    //Clear the existing text value from the text box. 
    await textbox.clear();

    //Verify the placeholder of the text box. 
    const placeholder = await textbox.getAttribute("placeholder");
    await expect(textbox).toHaveAttribute('placeholder', 'Enter Email');

    //Type the text into the text box. 
    await textbox.fill('Bharath Reddy');

    //Press the keys like function keys in the text box. 
    await textbox.press('Control+A');//Select all the text in the text box.
    await textbox.press('Backspace');//Delete the selected text in the text box.

    //Verify the value entered into the text box. 
    await expect(textbox).toHaveValue('Bharath Reddy');

    /* =====================================================
 Dropdown Element Validations
==================================================== */

    //Locate the dropdown element
    const dropdown = page.locator('#dropdown');

    //Select an option from the dropdown. 
    await dropdown.selectOption({ label: 'option-text' });
    await dropdown.selectOption({ value: 'att-value' });
    await dropdown.selectOption({ index: 0 });

    //Verify if the dropdown is multi-selected. 
    let isMultiSelect = await dropdown.getAttribute('multiple') !== null;

    //Select multiple options from the drop-down. 
    await dropdown.selectOption({ label: 'option-text' });
    await dropdown.selectOption({ value: 'att-value' });
    await dropdown.selectOption({ index: 0 });

    //Deselect the options from the drop-down. 
    await dropdown.selectOption({ label: 'option-text' });
    await dropdown.selectOption({ value: 'att-value' });
    await dropdown.selectOption({ index: 0 });

    //Verify the selected option from the dropdown
    const selectedOption = await dropdown.inputValue();
    await expect(dropdown).toHaveValue('option-value');

    //Total options available in the drop-down. 
    const optionsCount = await dropdown.locator('option').count();
    await expect(optionsCount).toBe(5);

    //Verify all the options displayed within the drop-down. 
    let options = await dropdown.locator('option').allTextContents();
    await expect(options).toEqual(['Option 1', 'Option 2']);

    /* =====================================================
Checkbox Element Validations
==================================================== */

    //Locate the textbox element
    const checkbox = page.locator('#textbox');

    //Select the checkbox before clicking. 
    if (!(await checkbox.isChecked())) {
        await checkbox.check();
    }

    /* =====================================================
Radio button Element Validations
==================================================== */

    //Locate the radio button element
    const radioButton = page.locator('#radio-button');

    //Select the checkbox before clicking. 
    await radioButton.check();

    /* =====================================================
Image Element Validations
==================================================== */

    //Locate the image element
    const image = page.locator('#image');

    //Verify the image is displayed within the page. 
    await expect(image).toBeVisible();

    //Verify the image is valid or not based on the source path. 
    let imageSource = await image.getAttribute('src');
    await expect(imageSource).toBe('expected-src-path');

    //Verify the image size. 
    const imageSize = await image.boundingBox();
    const width = imageSize?.width;
    const height = imageSize?.height;

    //Verify the position of the image within the page. 
    const imagePosition = await image.boundingBox();
    const x = imagePosition?.x;
    const y = imagePosition?.y;

    /* =====================================================
Hyperlink Element Validations
==================================================== */

    //Locate the hyperlink element
    const link = page.locator('#a');

    //Verify the hyperlink. (method 1)
    await expect(link).toHaveAttribute('href', 'expected-link-url');

    //Verify the hyperlink. (method 2)
    await link.click();
    await expect(page).toHaveURL('expected-link-url');

    /* =====================================================
Text Element Validations
==================================================== */

    //Locate the text element
    const textElement = page.locator('#text-element');

    //Extract the text value and compare it with the expected value. 
    let text = await textElement.textContent();
    await expect(text).toBe('expected-text-value');

    /* =====================================================
Upload Element Validations
==================================================== */

    //Locate the file upload element
    const fileUpload = page.locator('#upload');

    //Upload the file. 
    await fileUpload.setInputFiles('path/to/file');

    /* =====================================================
Alert Element Validations
==================================================== */

    // Locate the alert trigger element.
    const alertTrigger = page.locator('#alert-trigger');

    //Code to handle alert (if alert comes)
    page.on('dialog', async dialog => {

        //Copy the message from the alert. 
        console.log(dialog.message())

        //Click on the OK button in the alert
        dialog.accept();

        //Click on the cancel button in the alert. 
        dialog.dismiss();

        //Enter text within the alert, and then click on "Accept" or "Dismiss." 
        dialog.accept("text-to-enter");

    })

    //Click on the button to get the alert. 
    alertTrigger.click();

    /* =====================================================
Frame Element Validations
==================================================== */

//Locate the main page element contains frame
const frame = page.frameLocator('//iframe');

//Locate the frame element using name or id attribute
const frameElement = frame.locator("#frame-element");
frameElement.click();





});