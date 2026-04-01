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

/****************************************************/
/****LEVEL 3- Combine multiple attributes using AND**/
/****************************************************/
//Syntax 7: //tagName[@attribute1='value' and @attribute2='value' and text()='value']

/****************************************************/
/****LEVEL 4- Advanced Xpath With Relationships******/
/****************************************************/

//Syntax 8: referenceElementXpath/relationship::targetElementXpath

// target => sibling => parent => ancestor => ancestor's parent

//ancestors parent: //div[@id="footerPanel"]
//ancestor : //ul
//parent : //li
//sibling : NA
//target : //a[text()="Services"]

//div[@id="footerPanel"]/child::ul/child::li/child::a[text()="Services"]
//div[@id="footerPanel"]//a[text()="Services"]

//child
//parent
//ancestor
//following-sibling
//preceding-sibling
//following
//preceding
// / => child
// // => descendant ==> with in the family


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

    //Locate the 'caption' using syntax 7.
    await page.locator('//p[@class="caption" and text()="Experience the difference"]');

    //Locate the 'Services' link using syntax 8.
    await page.locator('//div[@id="footerPanel"]//a[text()="Services"]');



});