//CSS selector : CSS selector is all about locating the elements by using CSS properties of web elements. 

//CSS selector syntaxes

//Syntax 1: tagName#id
//Syntax 2: tagName.className
//Syntax 3: tagName[attribute='value']
//Syntax 4: tagName[attribute*='value'] //* means contains
//Syntax 5: tagName[attribute^='value'] //^ means starts-with
//Syntax 6: tagName[attribute$='value'] //$ means ends-with
//Syntax 7: tagName[attribute1='value'][attribute2='value']
//Syntax 8: Advanced CSS selector with relationships => ancestor > parent > child


// target --> parent --> ancestor --> ancestor's parent --> ancestor's ancestor 

//ancestor: ul[class="leftmenu"]
//parent : li
//target: a[href="services.htm"]

// ul[class="leftmenu"] > li > a[href="services.htm"]

import { test, expect } from '@playwright/test';

test('CSS selector syntax', async ({ page }) => {

    //Launch the application
    await page.goto('https://www.google.com/');

    //Locate the 'Google search' text box using syntax 1. 
    await page.locator('textarea#APjFqb');

    //Locate the 'Google search' text box using syntax 2. 
    await page.locator('textarea.gLFyf');

    //Locate the 'Google search' text box using syntax 3. 
    await page.locator('textarea[title="Search"]');

    //Locate the 'How Search Works' text box using syntax 4.
    await page.locator('a[href*="howsearchworks"]');

    //Locate the 'Google Search' button using syntax 5.
    await page.locator('textarea[title^="Sea"]');

    //Locate the 'Google Search' button using syntax 6.
    await page.locator('textarea[title$="rch"]');

    //Locate the 'Google Search' button using syntax 7.
    await page.locator('textarea[title="Search"][aria-label="Search"]');

    //Locate the 'Services' link using syntax 8.(https://parabank.parasoft.com/parabank/index.htm)
    await page.locator('ul[class="leftmenu"] > li > a[href="services.htm"]');



});