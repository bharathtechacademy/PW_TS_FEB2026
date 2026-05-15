import { test, expect, type TestInfo } from '@playwright/test';
import { LoginPageSteps } from '../../page-objects/page-steps/login-page-steps.ts';
import { DashboardPageSteps } from '../../page-objects/page-steps/dashboard-page-steps.ts';
import data from '../../testdata/ui/data.json' with { type: 'json' };

let loginPage: LoginPageSteps;
let dashboardPage: DashboardPageSteps;

function getValidCredentials(): { username: string; password: string } {
  const username = process.env.ORANGEHRM_USERNAME;
  const password = process.env.ORANGEHRM_PASSWORD;
  expect(
    username && password,
    'Set ORANGEHRM_USERNAME and ORANGEHRM_PASSWORD in .env (see .env.example).',
  ).toBeTruthy();
  return { username: username!, password: password! };
}

test.describe('OrangeHRM login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageSteps(page);
    dashboardPage = new DashboardPageSteps(page);
  });

  test('Verify login page loads with expected heading', async () => {
    await loginPage.launchtheApplication();
    await loginPage.verifyLoginPageIsDisplayed();
    await loginPage.verifyLoginHeadingText('Login');
  });

  test('Verify login page shows branding, demo hint, and forgot password', async () => {
    await loginPage.launchtheApplication();
    await loginPage.verifyLoginBrandingIsDisplayed();
    await loginPage.verifyCredentialsHintIsDisplayed();
    await loginPage.verifyForgotPasswordLinkIsDisplayed();
    await loginPage.verifyFooterSocialLinksAreDisplayed();
    await loginPage.verifyLoginButtonIsEnabled();
  });

  test('Verify successful login navigates to dashboard', async () => {
    const { username, password } = getValidCredentials();
    await loginPage.launchtheApplication();
    await loginPage.verifyLoginPageIsDisplayed();
    await loginPage.enterUsernameAndPassword(username, password);
    await loginPage.clickOnLoginButton();
    await dashboardPage.verifyDashboardIsDisplayed();
    await dashboardPage.verifyUserMenuIsDisplayed();
  });

  test('Verify login fails with invalid credentials', async (
    {},
    testInfo: TestInfo,
  ) => {
    const testData = data[testInfo.title as keyof typeof data] as {
      username: string;
      password: string;
    };
    await loginPage.launchtheApplication();
    await loginPage.verifyLoginPageIsDisplayed();
    await loginPage.enterUsernameAndPassword(
      testData.username,
      testData.password,
    );
    await loginPage.clickOnLoginButton();
    await loginPage.verifyInvalidCredentialsMessage();
  });

  test('Verify required validation when username and password are empty', async () => {
    await loginPage.launchtheApplication();
    await loginPage.verifyLoginPageIsDisplayed();
    await loginPage.clearUsernameAndPassword();
    await loginPage.clickOnLoginButton();
    await loginPage.verifyRequiredFieldErrorsVisible();
  });

  test('Verify forgot password navigation', async () => {
    await loginPage.launchtheApplication();
    await loginPage.verifyForgotPasswordLinkIsDisplayed();
    await loginPage.clickOnForgotPasswordLink();
    await loginPage.verifyForgotPasswordPageIsDisplayed();
  });
});
