const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["firefox"].launch({
        headless:false,
        slowMo:100
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.goto("https://www.catch.com.au/");
    await page.click("a[data-testid='myaccount-reference']");
    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.
    await page.fill("#login_email","vivekbwaj.88@gmail.com");
    await page.fill("#login_password","catchpassword");
    await page.waitForTimeout(100000);
    await page.click("#button-login");
    await page.waitForSelector("a[data-testid='wishlist-reference']");
    await page.waitForTimeout(30000);
    await browser.close();
})();