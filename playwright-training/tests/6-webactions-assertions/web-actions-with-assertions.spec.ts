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
await expect(button).toHaveAttribute('value','Log In');//Validating attribute and its value are present. 

//Click on the button
await button.click();

//Double-click on the button
await button.dblclick();

//Right click on the
await button.click({button:'right'});

//Mouse over the button
await button.hover();

//Scroll till the button is displayed if the button is available somewhere at the bottom of the screen
await button.scrollIntoViewIfNeeded();

//Force click on the button
await button.click({force:true});

    /* =====================================================
 Textbox Element Validations
==================================================== */

//Locate the textbox element
const textbox = page.locator('#textbox');

//Clear the existing text value from the text box. 
await textbox.clear();

//Verify the placeholder of the text box. 
const placeholder = await textbox.getAttribute("placeholder");
await expect(textbox).toHaveAttribute('placeholder','Enter Email');

//Type the text into the text box. 
await textbox.fill('Bharath Reddy');

//Press the keys like function keys in the text box. 
await textbox.press('Control+A');//Select all the text in the text box.
await textbox.press('Backspace');//Delete the selected text in the text box.

//Verify the value entered into the text box. 
await expect(textbox).toHaveValue('Bharath Reddy');

});