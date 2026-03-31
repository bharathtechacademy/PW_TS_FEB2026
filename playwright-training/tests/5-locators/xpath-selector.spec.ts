//Path  : XPath is all about locating the elements by using XML path expressions. 

//Absolute : starts with /
//Relative : starts with //

//XPATH syntaxes:

/****************************************************/
/*****************LEVEL 1- BASIC*********************/
/****************************************************/
//Syntax 1: //tagName[@attribute='value']
//Syntax 2: //tagName[text()='value']

/****************************************************/
/****************LEVEL 2- contains , starts-with*****/
/****************************************************/
//Syntax 3: //tagName[contains(@attribute,'value')]
//Syntax 4: //tagName[starts-with(@attribute,'value')]
//Syntax 5: //tagName[contains(text(),'value')]
//Syntax 6: //tagName[starts-with(text(),'value')]


import { test, expect } from '@playwright/test';

test('XPATH selector syntax', async ({ page }) => {

    //Launch the application
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    //Locate the 'Logo' using syntax 1.
    await page.locator('//img[@class="logo"]');

    //Locate the 'caption' using syntax 2.
    await page.locator('//p[text()="Experience the difference"]');

    //Locate the 'Logo' using syntax 3.
    await page.locator('//img[contains(@src,"logo")]');

    //Locate the 'Logo' using syntax 4.
    await page.locator('//img[starts-with(@src,"images/logo")]');

    //Locate the 'caption' using syntax 5.
    await page.locator('//p[contains(text(),"difference")]');

    //Locate the 'caption' using syntax 6.
    await page.locator('//p[starts-with(text(),"Experience")]');



});