import { Page, expect } from "@playwright/test";
import homePage from '../page-elements/home-page-elements.json' with { type: 'json' };
import { WebCommons } from "../../commons/ui/web-commons.ts";


//This class will contain all the common methods or step definitions related to the home page of the application. 
export class HomePageSteps {

    page: Page;
    web: WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(this.page);
    }

    //Method to verify home page is displayed. 
    async verifyHomePageIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(homePage.homePageHeaderLink);
    }

    //Method to verify users menu is displayed on home page
    async verifyUsersMenuIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(homePage.usersLink);
    }

    //Method to click on users menu
    async clickOnUsersMenu(): Promise<void> {
        await this.web.clickElement(homePage.usersLink);
    }

    //Method to verify add user button is displayed
    async verifyAddUserButtonIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(homePage.addUserButton);
    }

    //Method to click on add user button
    async clickOnAddUserButton(): Promise<void> {
        await this.web.clickElement(homePage.addUserButton);
    }

    //Method to verify add user form is displayed
    async verifyAddUserFormIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(homePage.addUserEmailTextBox);
        await this.web.isElementVisible(homePage.roleDropdown);
    }

    //Method to enter invite user email
    async enterInviteUserEmail(email: string): Promise<void> {
        await this.web.enterText(homePage.addUserEmailTextBox, email);
    }

    //Method to select role from role dropdown
    async selectUserRole(role: string): Promise<void> {
        await this.web.clickElement(homePage.roleDropdown);
        await this.page.getByText(role, { exact: true }).first().click();
    }

    //Method to click on invite button
    async clickOnInviteButton(): Promise<void> {
        await this.web.clickElement(homePage.inviteButton);
    }

    //Method to verify invited users list is displayed
    async verifyInvitedUsersListIsDisplayed(): Promise<void> {
        await this.web.isElementVisible(homePage.invitedUsersListSection);
    }

    //Method to verify newly invited user is listed
    async verifyInvitedUserIsListed(email: string): Promise<void> {
        await expect(this.page.getByText(email, { exact: true }).first()).toBeVisible();
    }

    //Method to click on the profile icon 
    async clickOnProfileIcon(): Promise<void> {
        await this.web.clickElement(homePage.profile);
    }

    //Method to click on the logout button
    async clickOnLogoutButton(): Promise<void> {
        await this.web.clickElement(homePage.logoutLink);
    }

}