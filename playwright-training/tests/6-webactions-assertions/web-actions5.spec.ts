import { test, expect } from '@playwright/test';

test('Web Actions - Handling shadow root', async ({ page }) => {

// 1. Enter URL and Launch the application (https://books-pwakit.appspot.com/)
await page.goto('https://books-pwakit.appspot.com/');

// 2. Locate the search books textbox
const searchBooksTextbox = page.locator('input[aria-label="Search Books"]');

// 3. Enter the book name in the search books textbox
await searchBooksTextbox.fill('The Great Gatsby');

//4. Press the Enter key
await searchBooksTextbox.press('Enter');

});
