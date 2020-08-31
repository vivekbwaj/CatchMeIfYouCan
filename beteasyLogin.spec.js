const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["chromium"].launch({
        headless:false,
        slowMo:50
        // devtools:true
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.route('**/api/account/signin', route => route.fulfill({path:"beteasyloginResponse.json"}));
    await page.route('**/api/account/detail', route => route.fulfill({path:"beteasyvalidUser.json"}));

    await page.goto("https://beteasy.com.au/");
    await page.click("button[data-testid='topbarDropDown']");
    await page.fill("input[data-testid='emailLoginDropDownContent']","catchCatch");
    await page.fill("input[data-testid='passwordLoginDropDownContent']","yourpassword");  
    await page.click("button[data-testid='submitLoginDropDownContent']");
    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.
    await page.waitForTimeout(5000);
    await browser.close();
})();

