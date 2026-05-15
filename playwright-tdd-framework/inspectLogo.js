import { chromium } from 'playwright';
(async () => {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        console.log('Navigating to https://accounts.creatio.com/login/alm...');
        await page.goto('https://accounts.creatio.com/login/alm');
        
        // Wait for cookie dialog
        console.log('Waiting for #CybotCookiebotDialog...');
        await page.waitForSelector('#CybotCookiebotDialog', { timeout: 30000 });
        
        const creatioLogoVisible = await page.locator('div#CybotCookiebotDialogPoweredbyImage').isVisible();
        const cookieBotLogoVisible = await page.locator('img#CybotCookiebotDialogPoweredbyCybot').isVisible();
        
        const creatioLogoHtml = await page.evaluate(() => document.querySelector('div#CybotCookiebotDialogPoweredbyImage')?.outerHTML);
        const cookieBotLogoHtml = await page.evaluate(() => document.querySelector('img#CybotCookiebotDialogPoweredbyCybot')?.outerHTML);
        
        const allImagesInDialog = await page.evaluate(() => 
            Array.from(document.querySelectorAll('#CybotCookiebotDialog img')).map(img => ({
                id: img.id,
                src: img.src,
                alt: img.alt,
                outerHTML: img.outerHTML
            }))
        );

        const allDivsInDialog = await page.evaluate(() => 
            Array.from(document.querySelectorAll('#CybotCookiebotDialog div')).filter(div => div.id).map(div => div.id)
        );

        console.log(JSON.stringify({
            creatioLogoVisible,
            cookieBotLogoVisible,
            creatioLogoHtml,
            cookieBotLogoHtml,
            allImagesInDialog,
            allDivsInDialog
        }, null, 2));

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
})();
