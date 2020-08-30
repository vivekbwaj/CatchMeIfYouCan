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
        console.log(request.url(),JSON.stringify(request.headers()));
        // return route.continue();
        return route.fulfill(
            {
                status: 200,
                headers:{"accept":"*/*","x-csrf-token":"7wwHcW7EmZRV92GOFgdea5CghZKihViQQpUjyp9SsAd/POKcFdIKL0ghZo0J6z1+MVszzDU35zLXzCjOlqdivQ==","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4217.0 Safari/537.36","x-requested-with":"XMLHttpRequest","referer":"https://demo.bendigobank.com.au/banking/","cookie":"_device_id=a712080a-4ec8-4c68-a124-e517a7b99863; _session_id=8c14ea8051a9a4fdb2c33e5d4900c335"},
                contentType: 'application/json',
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

    await page.waitForTimeout(30000);
    await browser.close();
})();