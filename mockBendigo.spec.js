const playwright = require ('playwright');

(async()=>{
    const browser = await playwright["chromium"].launch({
        headless:false,
        slowMo:50
        // devtools:true
    });
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.route('**/api/notifications', route => {
        const request = route.request()
        console.log(request.url());
        // return route.continue();
        return route.fulfill(
            {
                status: 200,
                headers:{'content-type': 'application/json','Referrer-Policy': 'origin-when-cross-origin, strict-origin-when-cross-origin','X-Permitted-Cross-Domain-Policies':'none',
                'Strict-Transport-Security': 'max-age=31536000; includeSubdomains','Expires': 0
            
            },
                body: {
                    "upcoming":0,
                    "upcomingForAnother":0,
                    "messages":4,
                    "cards":33,
                    "support":44,
                    "change_log":0
                 }
             }
         );
      });

    await page.goto("https://demo.bendigobank.com.au/banking/sign_in");
    await page.click("button[value='personal']");

    await page.waitForLoadState("domcontentloaded"); // The promise resolves after 'load' event.

    await page.waitForTimeout(60000);
    await browser.close();
})();