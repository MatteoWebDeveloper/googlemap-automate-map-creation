require("./ui-server"); 
const { startBrowser } = require("./browser"); 
const { start: startPupeteer } = require("./pupeteerInstance"); 
const { startGoogleMapAutomation } = require("./googleMap"); 
const { startInterfaceSetup } = require("./userInterfaceSetup"); 
const { mockInterfaceSetup } = require('./mockInterfaceSetup');
const { getUserSetup } = require('./setupInstance');
const { getCompiledUserInstructions } = require('./userData');

const main = async () => {
    const websocketLocation = await startBrowser();

    await startPupeteer(websocketLocation);

    if (process.env.SKIP_UI_SETUP) {
        mockInterfaceSetup();
    } else {
        await startInterfaceSetup();
    }
    
    const { PAGE, DATA_SOURCE_CSV, DATA_MAP_CSV } = getUserSetup();

    const compiledUserInstructions = {
        page: PAGE,
        instructions: getCompiledUserInstructions(DATA_SOURCE_CSV, DATA_MAP_CSV)
    };

    startGoogleMapAutomation(compiledUserInstructions);
}

main();