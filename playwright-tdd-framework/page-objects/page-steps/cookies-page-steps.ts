import { Page } from "@playwright/test";
import cookiesPage from '../page-elements/cookies-page-elements.json' with { type: 'json' };
import { WebCommons } from "../../commons/ui/web-commons.ts";

//This class will contain all the common methods or step definitions related to the login page of the application. 
export class CookiesPageSteps {

    page: Page;
    web: WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(this.page);
    }

    //Method to verify cookie space is displayed 
    async verifyCookiesPageIsDisplayed(){
        await this.web.isElementVisible(cookiesPage.cookiesHeader);
    }

    //Method to verify the content of the cookies page
    async verifyCookiesPopupContent(expectedContent:string){
        await this.web.isElementVisible(cookiesPage.cookiesContent);
        const actualContent = await this.web.getElementText(cookiesPage.cookiesContent);
        await this.web.compareText(actualContent,expectedContent);
    }

    //Method to verify the logos displayed on the cookie's pop-up 
    async verifyCookiesPageLogos(){
        await this.web.isElementVisible(cookiesPage.creatioLogo);
        await this.web.isElementVisible(cookiesPage.cookieBotLogo);
    }

    //Method to verify all the selection buttons displayed in the cookies popup. 
    async verifyCookiesPageSelectionButtons(){
        await this.web.isElementVisible(cookiesPage.allowAllButton);
        await this.web.isElementVisible(cookiesPage.allowSelectionButton);
        await this.web.isElementVisible(cookiesPage.denyButton);
    }

    //Method to verify all the switch buttons displayed in the cookies popup. 
    async verifyCookiesPageSwitchButtons(){
        await this.web.isElementVisible(cookiesPage.necessarySwitchButton);
        await this.web.isElementVisible(cookiesPage.preferencesSwitchButton);
        await this.web.isElementVisible(cookiesPage.statisticsSwitchButton);
        await this.web.isElementVisible(cookiesPage.marketingSwitchButton);
    }

    //Method to verify show details link is displayed in the cookies popup. 
    async verifyShowDetailsLink(){
        await this.web.isElementVisible(cookiesPage.showDetailsLink);
    }

    //Method to click on the show details link in the cookies pop-up. 
    async clickOnShowDetailsLink(){
        await this.web.clickElement(cookiesPage.showDetailsLink);
    }

    //Method to verify the expanded view of Cookies Popup. 
    async verifyExpandedViewOfCookiesPopup(){
        await this.web.isElementVisible(cookiesPage.cookiePopupExpandedView);
    }

    //Method two: click on the specific selection button. 
    async clickOnSelectionButton(buttonName:string){
        switch(buttonName.toLowerCase()){
            case 'allow all':
                await this.web.clickElement(cookiesPage.allowAllButton);
                break;
            case 'allow selection':
                await this.web.clickElement(cookiesPage.allowSelectionButton);
                break;
            case 'deny':
                await this.web.clickElement(cookiesPage.denyButton);
                break;
            default:
                throw new Error(`Invalid button name: ${buttonName}`);
        }
    } 
    
    //Method to verify Cookies pop-up is closed. 
    async verifyCookiesPopupIsClosed(){
        await this.web.isElementDisappeared(cookiesPage.cookiesHeader);
    }
    
}