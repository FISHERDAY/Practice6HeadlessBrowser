const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 900 });
        await page.goto('https://pptr.dev/', {
            waitUntil: 'networkidle2',
        });

        await page.waitForSelector('.navbar__search-input');
        await page.type('input[class="navbar__search-input"]', 'pdf', {delay: 20});
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load' }),
            await page.keyboard.press('Enter'),
        ]);  
        await page.screenshot({ path: './src/screenshots/result1.png' });
        await page.pdf({ path: './src/screenshots/result1.pdf', format: 'A4' });

        await browser.close();
    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    }
})();
