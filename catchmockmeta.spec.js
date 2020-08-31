const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["chromium"].launch({
        headless:false,
        slowMo:50
        // devtools:true
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.route('**/meta.json', route => {
        const request = route.request()
        console.log(request.url());
        return route.fulfill(
            {
                status: 200,
                contentType: 'application/json',
                body: `{
                    "loggedIn":false,
                    "displayName":null,
                    "clubActive":false,
                    "flybuysLinked":false,
                    "cartItemCount":100,
                    "wishlistItemCount":null,
                    "messageCount":null
                }`
             }
         );
      });
    //or do it this way
    // await page.route('**/meta.json', route => route.fulfill({path:"catchmeta.json"}));
    await page.goto("https://www.catch.com.au/");

    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.
    await page.waitForTimeout(5000);
    await browser.close();
})();

// What this does ? it sets the cartItem count =100