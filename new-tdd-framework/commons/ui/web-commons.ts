import { Page, Locator, expect } from '@playwright/test';

export class WebCommons {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async element(locator: string): Promise<Locator> {
    return this.page.locator(locator);
  }

  async elements(locator: string, locatorType: string): Promise<Locator> {
    switch (locatorType) {
      case 'getByText':
        return this.page.getByText(locator);
      case 'getByLabel':
        return this.page.getByLabel(locator);
      case 'getByPlaceholder':
        return this.page.getByPlaceholder(locator);
      case 'getByAltText':
        return this.page.getByAltText(locator);
      case 'getByTitle':
        return this.page.getByTitle(locator);
      default:
        throw new Error(`Invalid locator type: ${locatorType}`);
    }
  }

  async launchApplication(url: string, title?: string): Promise<void> {
    await this.page.goto(url);
    if (title) {
      await expect(this.page).toHaveTitle(new RegExp(title));
    }
  }

  async scrollToElement(locator: string): Promise<void> {
    const element = await this.element(locator);
    await element.scrollIntoViewIfNeeded();
  }

  async clickElement(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.click();
  }

  async doubleClickElement(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.dblclick();
  }

  async rightClickElement(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.click({ button: 'right' });
  }

  async hoverElement(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.hover();
  }

  async forceClickElement(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.click({ force: true });
  }

  async clearText(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.clear();
  }

  async enterText(locator: string, text: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await this.clearText(locator);
    await element.fill(text);
  }

  async getText(locator: string): Promise<string> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    return await element.inputValue();
  }

  async pressKey(locator: string, key: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.press(key);
  }

  async selectOption(locator: string, option: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.selectOption(option);
  }

  async getElementText(locator: string): Promise<string | null> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    return await element.textContent();
  }

  async getElementAttribute(
    locator: string,
    attribute: string,
  ): Promise<string | null> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    return await element.getAttribute(attribute);
  }

  async uploadFile(locator: string, filePath: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await element.setInputFiles(filePath);
  }

  async isElementVisible(locator: string): Promise<void> {
    const element = await this.element(locator);
    await this.scrollToElement(locator);
    await expect(element).toBeVisible();
  }

  async isElementEnabled(locator: string): Promise<void> {
    const element = await this.element(locator);
    await expect(element).toBeEnabled();
  }

  async isElementDisappeared(locator: string): Promise<void> {
    const element = await this.element(locator);
    await expect(element).toBeHidden();
  }

  handleAlert(action: 'accept' | 'dismiss', textToEnter?: string): void {
    this.page.once('dialog', async (dialog) => {
      if (action === 'accept') {
        await dialog.accept(textToEnter);
      } else {
        await dialog.dismiss();
      }
    });
  }

  async takeScreenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath });
  }

  async compareText(actual: string | null, expected: string): Promise<void> {
    if (!actual?.includes(expected)) {
      throw new Error(`Expected Value is ${expected} , But found ${actual}`);
    }
  }

  async verifyElementText(
    locator: string,
    expectedText: string,
  ): Promise<void> {
    const element = await this.element(locator);
    await expect(element).toHaveText(expectedText);
  }
}
