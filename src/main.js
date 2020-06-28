const { startBrowser } = require("./startBrowser"); 
const { start: startPupeteer } = require("./pupeteerInstance"); 
const { startGoogleMap } = require("./startGoogleMap"); 
const { startInterfaceSetup } = require("./startInterfaceSetup"); 

const main = async () => {
    const websocketLocation = await startBrowser();
    await startPupeteer(websocketLocation);

    await startInterfaceSetup();
    
    startGoogleMap();
}

main();