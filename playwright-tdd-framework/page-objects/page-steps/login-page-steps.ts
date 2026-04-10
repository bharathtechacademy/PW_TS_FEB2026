import { Page } from "@playwright/test";
import loginPage from '../page-elements/login-page-elements.json' with { type: 'json' };
import { WebCommons } from "../../commons/ui/web-commons.ts";
import config from '../../config/config.json' with { type: 'json' };


//This class will contain all the common methods or step definitions related to the login page of the application. 
export class LoginPageSteps {

    page: Page;
    web: WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(this.page);
    }

    //Method to Launch the Application 
    async launchtheApplication(): Promise<void> {
        await this.web.launchApplication(config.app.url,config.app.title);
    }

    //Method to Verify login page is displayed. 
    async verifyLoginPageIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(loginPage.loginPageHeader);
    }

    //Method to enter username and password 
    async enterUsernameAndPassword(username: string, password: string): Promise<void> {
        await this.web.enterText(loginPage.businessEmailTextBox, username);
        await this.web.enterText(loginPage.passwordTextBox, password);
    }

    //Method to click on login button
    async clickOnLoginButton(): Promise<void> {
        await this.web.clickElement(loginPage.loginButton);
    }

    //Method 2: Verify forgot password link is displayed 
    async verifyForgotPasswordLinkIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(loginPage.forgotPasswordLink);
    }

    //Method to click on the forgot password link 
    async clickOnForgotPasswordLink(): Promise<void> {
        await this.web.clickElement(loginPage.forgotPasswordLink);
    }

    //Method to verify forgot password confirmation message 
    async verifyForgotPasswordConfirmationMessage(): Promise<void> {
        await this.web.isElementVisible(loginPage.forgotPasswordConfirmationMsg);
    }

    //Method to verify social media login icons 
    async verifySocialMediaLoginIcons(): Promise<void> {
        await this.web.isElementVisible(loginPage.linkedInIcon);
        await this.web.isElementVisible(loginPage.googleIcon);
    }

    //Method to verify login error message 
    async verifyLoginErrorMessage(): Promise<void> {
        await this.web.isElementVisible(loginPage.loginErrorMessage);
    }

    //Method to verify the sign up link is displayed on the login page 
    async verifySignUpLinkIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(loginPage.signUpLink);
    }

    //Method to verify user is logged out successfully
    async verifyUserIsLoggedOut(): Promise<void> {
        await this.web.isElementVisible(loginPage.loginPageHeader);
    }
}