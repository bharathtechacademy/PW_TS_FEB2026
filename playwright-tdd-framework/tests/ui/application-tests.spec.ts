import { test, expect, TestInfo } from '@playwright/test';
import { LoginPageSteps } from '../../page-objects/page-steps/login-page-steps.ts';
import { HomePageSteps } from '../../page-objects/page-steps/home-page-steps.ts';
import { CookiesPageSteps } from '../../page-objects/page-steps/cookies-page-steps.ts';
import data from '../../testdata/ui/data.json' with {type: 'json'};

let loginPage: LoginPageSteps;
let homePage: HomePageSteps;
let cookiesPage: CookiesPageSteps;
let testData: any;

test.describe('UI Application Tests', () => {

    //Initialize the page objects before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageSteps(page);
        homePage = new HomePageSteps(page);
        cookiesPage = new CookiesPageSteps(page);
    });

    //Test Case 1: Verify Cookies Page is Displayed
    test('Verify Cookies Popup', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
    });

    //Test Case 2: Verify cookies pop-up content 
    test('Verify Cookies Popup Content', async () => {
        testData = data["Verify Cookies Popup Content"];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPopupContent(testData.content);
    });

    //Test Case 3: Verify Logos displayed in the cookies page. 
    test('Verify Cookies Page Logos', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageLogos();
    });

    //Test Case 4: Verify selection buttons in the cookies page.
    test('Verify Cookies Page Selection Buttons', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSelectionButtons();
    });

    //Test Case 5: Verify switch buttons in the cookies page.
    test('Verify Cookies Page Switch Buttons', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSwitchButtons();
    });

    //Test Case 6: Verify show details link in the cookies page.
    test('Verify Show Details Link in Cookies Page', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyShowDetailsLink();
    });

    //Test Case 7: Verify expanded view of cookies pop-up after clicking on show details link.
    test('Verify Expanded View of Cookies Popup', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.clickOnShowDetailsLink();
        await cookiesPage.verifyExpandedViewOfCookiesPopup();
    });

    //Test Case 8: Verify cookies pop-up getting closed after clicking on 'allow all' button.
    test('Verify Cookies Popup is Closed after Clicking Allow Selection Button', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSelectionButtons();
        await cookiesPage.clickOnSelectionButton("allow all");
        await cookiesPage.verifyCookiesPopupIsClosed();
    });

    //Test Case 9: Verify Login Functionality with valid credentials.
    test('Verify Login with Valid Credentials', async ({}, testInfo: TestInfo) => {
        test.slow();
        testData = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSelectionButtons();
        await cookiesPage.clickOnSelectionButton("allow all");
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterUsernameAndPassword(testData.username, testData.password);
        await loginPage.clickOnLoginButton();
        await homePage.verifyHomePageIsDisplayed();
    });

    //Test Case 10: Verify Login Functionality with invalid credentials.
    test('Verify Login with Invalid Credentials', async ({}, testInfo: TestInfo) => {
        testData = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSelectionButtons();
        await cookiesPage.clickOnSelectionButton("allow all");
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterUsernameAndPassword(testData.username, testData.password);
        await loginPage.clickOnLoginButton();
        await loginPage.verifyLoginErrorMessage();
    });

    //Test Case 11: Verify Forgot Password Functionality.
    test('Verify Forgot Password Functionality', async ({}, testInfo: TestInfo) => {
        testData = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSelectionButtons();
        await cookiesPage.clickOnSelectionButton("allow all");
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterUsernameAndPassword(testData.username, testData.password);
        await loginPage.clickOnForgotPasswordLink();
        await loginPage.verifyForgotPasswordConfirmationMessage();
    });

    //Test Case 12: Verify Social Media Login Icons are displayed on the login page.
    test('Verify Social Media Login Icons', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPageIsDisplayed();
        await cookiesPage.verifyCookiesPageSelectionButtons();
        await cookiesPage.clickOnSelectionButton("allow all");
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.verifySocialMediaLoginIcons();
    });


});