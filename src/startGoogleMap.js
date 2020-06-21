const CONFIG = require('./config.json');
const browser = require('./pupeteerInstance');
const { getMembersData } = require('./members');
const { updateMap } = require('./updateMap');

const startGoogleMap = async () => {
    await browser.page.goto(CONFIG.PAGE, { waitUntil: 'networkidle2'});

    const data = getMembersData();

    updateMap(data);
}

module.exports = {
    startGoogleMap
}
