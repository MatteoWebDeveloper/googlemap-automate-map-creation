const { startBrowser } = require("./startBrowser"); 
const { start: startPupeteer } = require("./pupeteerInstance"); 
const { startGoogleMap } = require("./startGoogleMap"); 

const main = async () => {
    const websocketLocation = await startBrowser();
    await startPupeteer(websocketLocation);
    
    startGoogleMap();
}

main();