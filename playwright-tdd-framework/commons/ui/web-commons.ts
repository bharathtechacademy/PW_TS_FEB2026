import {Page, Locator, expect} from '@playwright/test';

export class WebCommons {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Common method to generate WebElement from the locator
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    //Common method to launch the application
    async launchApplication(url: string, title?: string): Promise<void> {
        await this.page.goto(url);
        if (title) {
            await expect(this.page).toHaveTitle(title);
        }
    }

    //Common method to scroll to an element
    async scrollToElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    //Common method to click an element
    async clickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.click();
    }

    //Common method to perform double click on an element
    async doubleClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.dblclick();
    }

    //Common method to perform right click on an element
    async rightClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.click({button: 'right'});
    }

    //Common method to perform hover on an element
    async hoverElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.hover();
    }

    //Common method to perform force click on an element
    async forceClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.click({force: true});
    }

    //Common method to clear text from an element
    async clearText(locator: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.clear();
    }

    //Common method to type text into an element
    async enterText(locator: string, text: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await this.clearText(locator);
        await element.fill(text);
    }

    //Common method to get the text entered in the textbox
    async getText(locator: string): Promise<string> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.inputValue();
    }

    //Common method to press a key on an element
    async pressKey(locator: string, key: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.press(key);
    }

    //Common method to select an option from a dropdown
    async selectOption(locator: string, option: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.selectOption(option);
    }

    //Common method to get the text from an element
    async getElementText(locator: string): Promise<string | null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.textContent();
    }

    //Commn method to get the attribute value of an element
    async getElementAttribute(locator: string, attribute: string): Promise<string | null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.getAttribute(attribute);
    }

    //Common method to upload a file to an element
    async uploadFile(locator: string, filePath: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.setInputFiles(filePath);
    }

    //Common method to check if an element is visible
    async isElementVisible(locator: string): Promise<void> {
        const element = await this.element(locator);
        expect(element).toBeVisible();
    }

    //Common method to check if an element is enabled
    async isElementEnabled(locator: string): Promise<void> {
        const element = await this.element(locator);
        expect(element).toBeEnabled();
    }

    //Common method to verify element is disappeared
    async isElementDisappeared(locator: string): Promise<void> {
        const element = await this.element(locator);
        expect(element).toBeHidden();
    }

    //Common method to handle alert pop-up
    async handleAlert(action: 'accept' | 'dismiss', textToEnter?: string): Promise<void> {
        this.page.on('dialog', async (dialog) => {
            if (action === 'accept') {
                await dialog.accept(textToEnter);
            } else {
                await dialog.dismiss();
            }
        });
    }

    //Common method to take screenshot of the page
    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({path});
    }

    //Common method to compare text values
    async compareText(actual :string |null, expected:string){
        if(actual!==expected){
            throw new Error(`Expected Value is ${expected} , But found ${actual}`);
        }
    }

    //Verify element having text value
    async verifyElementText(locator: string, expectedText:string){
        const element = await this.element(locator);
        await expect(element).toHaveText(expectedText);
    }

}