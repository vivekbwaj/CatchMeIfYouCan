const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["chromium"].launch({
        headless:false,
        slowMo:50
        // devtools:true
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.route('**/*.{png,jpg,jpeg}', route => {
        const reqURL = route.request().url();
        console.log(`ABORTING: ${reqURL}`);
        route.abort();
    });
    await page.goto("https://www.catch.com.au/");

    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.
    await page.waitForTimeout(20000);
    await browser.close();
})();

// What this does ? it aborts requests for all image types