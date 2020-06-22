const browser = require('./pupeteerInstance');
const { updateLayer, deleteLayer } = require('./mapLayer');

const selectors = {
    getAllLayers: async () => browser.page.$$('#featurelist-scrollable-container [layerid]'),
    searchBar: '#mapsprosearch-field',
    addToLocationMap: '#addtomap-button',
    editStyle: '#map-infowindow-style-button',
    editLocationName: '#map-infowindow-edit-button',
    nameInput: '#map-infowindow-attr-name-value',
    descriptionInput: '#map-infowindow-attr-description-value',
    dialogLocationSaveButton: '#map-infowindow-done-editing-button [role=button]'
};

const deleteAllLayers = async () => {
    const layers = await selectors.getAllLayers();
    const layersLength = layers.length;

    for (let index = 0; index < layersLength; index++) {
        await deleteLayer(0);
        await browser.page.waitFor(2000);
    }
};

const addLocationToMap = async (row) => {
    console.log('[LOG] addLocationToMap: ', row);

    await browser.page.type(selectors.searchBar, row.address);
    await browser.page.keyboard.press('Enter');

    await browser.page.waitForSelector(selectors.addToLocationMap);
    // await browser.page.click(selectors.addToLocationMap); // No idea why chrome does not like it
    await browser.page.evaluate(() => {
        const element = document.querySelector('#addtomap-button');
        element.click()
        return Promise.resolve();
    });

    await browser.page.waitForSelector(selectors.editLocationName);
    // await browser.page.click(selectors.editLocationName);
    await browser.page.evaluate(() => {
        const element = document.querySelector('#map-infowindow-edit-button');
        element.click()
        return Promise.resolve();
    });

    await browser.page.type(selectors.nameInput, row.locationName);
    await browser.page.type(selectors.descriptionInput, row.locationDescription);
    await browser.page.click(selectors.dialogLocationSaveButton);
};

const updateMap = async (data) => {
    await deleteAllLayers();

    for (const row of data) {
        await updateLayer(row.layerName);

        await addLocationToMap(row);
    }

    deleteLayer(0);
}

module.exports = {
    updateMap
};