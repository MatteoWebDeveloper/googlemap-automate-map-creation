const browser = require('./pupeteerInstance');
const { deleteLayer, deleteAllLayers, updateLayer, addLocationToMap } = require('./mapOperations');

const startMapAutomatedOperations = async (instructions) => {
    await deleteAllLayers();

    for (const row of instructions) {
        if (row.address === "") continue;

        await updateLayer(row.layerName);

        await addLocationToMap(row);
    }

    deleteLayer(0);
}

const startGoogleMapAutomation = async ({ page, instructions }) => {    
    await browser.page.goto(page, { waitUntil: 'networkidle2'});

    startMapAutomatedOperations(instructions);
}

module.exports = {
    startGoogleMapAutomation
}
