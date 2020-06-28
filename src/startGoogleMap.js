const browser = require('./pupeteerInstance');
const { getSetup } = require('./setupInstance');
const { getMembersData } = require('./members');
const { updateMap } = require('./updateMap');

const startGoogleMap = async () => {
    const { PAGE } = getSetup();
    
    await browser.page.goto(PAGE, { waitUntil: 'networkidle2'});

    const data = getMembersData();

    updateMap(data);
}

module.exports = {
    startGoogleMap
}
