import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { LoginPageSteps } from "../page-objects/page-steps/login-page-steps.ts";
import { CookiesPageSteps } from "../page-objects/page-steps/cookies-page-steps.ts";
import { HomePageSteps } from "../page-objects/page-steps/home-page-steps.ts";

class PlaywrightWorld extends World {
    page!: Page;
    loginPageSteps!: LoginPageSteps;
    cookiesPageSteps!: CookiesPageSteps;
    homePageSteps!: HomePageSteps;

    constructor(options: IWorldOptions) {
        super(options);        
    }

    initializePageObject(){
        this.loginPageSteps = new LoginPageSteps(this.page);
        this.cookiesPageSteps = new CookiesPageSteps(this.page);
        this.homePageSteps = new HomePageSteps(this.page);
    }
}

setWorldConstructor(PlaywrightWorld);