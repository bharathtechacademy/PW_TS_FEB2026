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



});