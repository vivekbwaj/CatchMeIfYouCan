const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["chromium"].launch({
        headless:false,
        slowMo:50
        // devtools:true
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();

    // await page.route('**',async(route,request) => {
    //     console.log(request.postData());
    // });

    await page.route('**/meta.json', route => {
        const request = route.request()
        console.log(request.url(),JSON.stringify(request.headers()));
        // return route.continue();
        return route.fulfill(
            {
                status: 200,
                contentType: 'application/json',
                body: {
                    "loggedIn":false,
                    "displayName":Neo,
                    "clubActive":false,
                    "flybuysLinked":false,
                    "cartItemCount":1,
                    "wishlistItemCount":null,
                    "messageCount":null
                 }
             }
         );
      });

    await page.goto("https://www.catch.com.au/");

    await page.click("div.club-catch");
    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.
    // await page.fill("#login_email","vivekbwaj.88@gmail.com");
    // await page.fill("#login_password","yourpassword");
    // await page.click("#button-login");
    // await page.waitForSelector("a[data-testid='wishlist-reference']");
    await page.waitForTimeout(30000);
    await browser.close();
})();