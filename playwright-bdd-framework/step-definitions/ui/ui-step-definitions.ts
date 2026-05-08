import {Given, When, Then} from '@cucumber/cucumber';
import  {CustomWorld} from '../../support/world.ts';

//Given Launch the creatio crm application
Given('Launch the creatio crm application', async function (this: CustomWorld) {
    await this.loginPageSteps.launchtheApplication();
});

//Then Verify cookies popup is displayed successfully
Then('Verify cookies popup is displayed successfully', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyCookiesPageIsDisplayed();
});

//Then Verify cookies popup selection buttons are displayed successfully
Then('Verify cookies popup selection buttons are displayed successfully', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyCookiesPageSelectionButtons();
});

//When User click on "Allow All" button in the cookies pop-up
When('User click on {string} button in the cookies pop-up', async function (this: CustomWorld, buttonName:string) {
    await this.cookiesPageSteps.clickOnSelectionButton(buttonName);
});

//Then Verify cookies pop-up should be closed successfully
Then('Verify cookies pop-up should be closed successfully', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyCookiesPopupIsClosed();
});

//Given The Login page is launched
Given('The Login page is launched', async function (this: CustomWorld) {
    await this.loginPageSteps.launchtheApplication();
});

//When User enter "<username>"  and "<password>" in the login page
When('User enter {string} and {string} in the login page', async function (this: CustomWorld, username:string, password:string) {
    await this.loginPageSteps.enterUsernameAndPassword(username, password);
});

//And User click on Login button in the login page
When('User click on Login button in the login page', async function (this: CustomWorld) {
    await this.loginPageSteps.clickOnLoginButton();
});

//Then Login Should be "<result>"
Then('Login Should be {string}', async function (this: CustomWorld, result:string) {
    if(result.toLowerCase() === 'success'){
        await this.homePageSteps.verifyHomePageIsDisplayed();   
    } else{
        await this.loginPageSteps.verifyLoginErrorMessage();
    } 
});

//Then Verify Forgot Password link is displayed successfully in the login page
Then('Verify Forgot Password link is displayed successfully in the login page', async function (this: CustomWorld) {
    await this.loginPageSteps.verifyForgotPasswordLinkIsDisplayed();
});

//When User click on Forgot Password link in the login page
When('User click on Forgot Password link in the login page', async function (this: CustomWorld) {
    await this.loginPageSteps.clickOnForgotPasswordLink();
});

//Then Verify user is navigated to the Forgot Password page successfully
Then('Verify user is navigated to the Forgot Password page successfully', async function (this: CustomWorld) {
    await this.loginPageSteps.verifyForgotPasswordConfirmationMessage();
});

//Then Verify Social Media Login options are displayed successfully in the login page
Then('Verify Social Media Login options are displayed successfully in the login page', async function (this: CustomWorld) {
    await this.loginPageSteps.verifySocialMediaLoginIcons();
});

//When User click on Logout button in the application
When('User click on Logout button in the application', async function (this: CustomWorld) {
    await this.homePageSteps.clickOnLogoutButton();
});

//Then Verify user is logged out successfully and navigated to the login page
Then('Verify user is logged out successfully and navigated to the login page', async function (this: CustomWorld) {
    await this.loginPageSteps.verifyUserIsLoggedOut();
});

//Then Verify cookies popup content contains the following text
Then('Verify cookies popup content contains the following text', async function (this: CustomWorld, docString:string) {
    const expectedContent = docString;
    await this.cookiesPageSteps.verifyCookiesPopupContent(expectedContent); 
});

//Then Verify cookies popup logos are displayed successfully
Then('Verify cookies popup logos are displayed successfully', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyCookiesPageLogos();
});

//Then Verify cookies popup switch buttons are displayed successfully
Then('Verify cookies popup switch buttons are displayed successfully', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyCookiesPageSwitchButtons();
});

//Then Verify show-details link is displayed successfully in the cookies pop-up
Then('Verify show-details link is displayed successfully in the cookies pop-up', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyShowDetailsLink();
});

//When User click on show-details link in the cookies pop-up
When('User click on show-details link in the cookies pop-up', async function (this: CustomWorld) {
    await this.cookiesPageSteps.clickOnShowDetailsLink();
});

//Then Verify cookies pop-up is expanded successfully
Then('Verify cookies pop-up is expanded successfully', async function (this: CustomWorld) {
    await this.cookiesPageSteps.verifyExpandedViewOfCookiesPopup();
});