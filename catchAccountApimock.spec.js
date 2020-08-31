const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["firefox"].launch({
        headless:false,
        slowMo:100
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.route('**/account.json', route => route.fulfill({path:"catchAccountResmock.json"}));
    await page.goto("https://www.catch.com.au/");
    await page.click("a[data-testid='myaccount-reference']");
    await page.waitForSelector("#button-login"); 
    await page.fill("#login_email","vivekbwaj.88@gmail.com");
    await page.fill("#login_password","yourpassword"); //use your actual password
    await page.click("#button-login");
    await page.waitForSelector("div.banner--container",);
    await page.waitForLoadState("domcontentloaded")
    await page.click("div.bordered-content button.close");
    await page.hover("a[data-testid='myaccount-reference']");
    await page.waitForTimeout(30000);
    await browser.close();
})();

// In this file we are trying to login and then mock the account.json api call....
// How to identify that it's mocked ? Check for text when hover over a[data-testid='myaccount-reference']