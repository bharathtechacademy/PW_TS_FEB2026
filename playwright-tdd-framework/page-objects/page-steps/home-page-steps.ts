import { Page } from "@playwright/test";
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

    //Method to click on the profile icon 
    async clickOnProfileIcon(): Promise<void> {
        await this.web.clickElement(homePage.profile);
    }

    //Method to click on the logout button
    async clickOnLogoutButton(): Promise<void> {
        await this.web.clickElement(homePage.logoutLink);
    }

}