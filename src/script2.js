const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 900 });
        await page.goto('https://pptr.dev/', {
            waitUntil: 'networkidle2',
        });

        await page.waitForSelector('.navbar');
        await page.$eval('.navbar', (element) => (element.style = 'background-color:#1F54C0'));
        await page.screenshot({ path: './src/screenshots/result2.png' });

        await browser.close();
    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    }
})();
