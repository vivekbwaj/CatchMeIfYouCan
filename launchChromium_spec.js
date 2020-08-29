const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["chromium"].launch({
        headless:false,
        slowMo:50,
        devtools:true
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto("https://www.catch.com.au/");
    await page.click("div.club-catch");
    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.
    const odometerChildren = await page.$$("div.odometer div.digit-container");
    let freeDeliveryCounter='';
    for( let container of odometerChildren ) {
        const attr = await page.evaluate(el => el.getAttribute("class"), container);
        freeDeliveryCounter += attr[attr.length-1]
    }
    console.log(freeDeliveryCounter);
    await browser.close();
})();