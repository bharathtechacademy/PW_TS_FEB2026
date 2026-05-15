import { Page, expect } from '@playwright/test';
import loginPage from '../page-elements/login-page-elements.json' with { type: 'json' };
import { WebCommons } from '../../commons/ui/web-commons.ts';
import config from '../../config/config.json' with { type: 'json' };

export class LoginPageSteps {
  page: Page;
  web: WebCommons;

  constructor(page: Page) {
    this.page = page;
    this.web = new WebCommons(this.page);
  }

  async launchtheApplication(): Promise<void> {
    await this.web.launchApplication(config.app.url, config.app.title);
  }

  async verifyLoginPageIsDisplayed(): Promise<void> {
    await this.web.isElementVisible(loginPage.loginHeading);
    await this.web.isElementVisible(loginPage.usernameInput);
    await this.web.isElementVisible(loginPage.passwordInput);
    await this.web.isElementVisible(loginPage.loginButton);
  }

  async verifyLoginHeadingText(expected: string): Promise<void> {
    await this.web.verifyElementText(loginPage.loginHeading, expected);
  }

  async enterUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<void> {
    await this.web.enterText(loginPage.usernameInput, username);
    await this.web.enterText(loginPage.passwordInput, password);
  }

  async clickOnLoginButton(): Promise<void> {
    await this.web.clickElement(loginPage.loginButton);
  }

  async verifyForgotPasswordLinkIsDisplayed(): Promise<void> {
    await this.web.isElementVisible(loginPage.forgotPasswordLink);
  }

  async clickOnForgotPasswordLink(): Promise<void> {
    await this.web.clickElement(loginPage.forgotPasswordLink);
  }

  async verifyInvalidCredentialsMessage(): Promise<void> {
    await this.web.isElementVisible(loginPage.invalidCredentialsMessage);
    const text = await this.web.getElementText(
      loginPage.invalidCredentialsMessage,
    );
    await this.web.compareText(text, 'Invalid credentials');
  }

  async verifyRequiredFieldErrorsVisible(): Promise<void> {
    const errors = this.page.locator(loginPage.requiredFieldError);
    await expect(errors).toHaveCount(2);
    await expect(errors.nth(0)).toHaveText('Required');
    await expect(errors.nth(1)).toHaveText('Required');
  }

  async clearUsernameAndPassword(): Promise<void> {
    await this.web.clearText(loginPage.usernameInput);
    await this.web.clearText(loginPage.passwordInput);
  }

  async verifyLoginBrandingIsDisplayed(): Promise<void> {
    await this.web.isElementVisible(loginPage.loginBranding);
  }

  async verifyCredentialsHintIsDisplayed(): Promise<void> {
    await this.web.isElementVisible(loginPage.credentialsHint);
  }

  async verifyFooterSocialLinksAreDisplayed(): Promise<void> {
    await this.web.isElementVisible(loginPage.footerSocialSection);
    const links = this.page.locator(`${loginPage.footerSocialSection} a`);
    await expect(links).toHaveCount(4);
  }

  async verifyLoginButtonIsEnabled(): Promise<void> {
    await this.web.isElementEnabled(loginPage.loginButton);
  }

  async verifyForgotPasswordPageIsDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/requestPasswordReset|auth\/requestPasswordReset/i);
  }
}
