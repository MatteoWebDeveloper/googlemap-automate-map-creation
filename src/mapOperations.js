const browser = require('./pupeteerInstance');

const selectors = {
    getLayers: '#featurelist-scrollable-container [layerid]',
    addLayer: '#map-action-add-layer',
    allLayersHeader: '#featurelist-scrollable-container [id^="ly"][id$="-layer-header"]',
    getHeaderByLayerIndex: async (layerIndex) => {
        const layerElement = await browser.page.$$('#featurelist-scrollable-container [layerid]');
        return await layerElement[layerIndex].$('[id$="-layer-header"]');
    },
    waitButtonLayerOptionByLayerIndex: async (layerIndex) => {
        return await browser.page.waitFor(eval(`(layerIndex) => {
            const layerElement = document.querySelectorAll('#featurelist-scrollable-container [layerid]')[layerIndex];

            return layerElement && layerElement.querySelector('[aria-label="Layer options"]') ? true : false;
        }`), {}, layerIndex);
    },
    getOptionButtonByLayerIndex: async (layerIndex) => {
        const layerElement = await browser.page.$$('#featurelist-scrollable-container [layerid]');
        return await layerElement[layerIndex].$('[aria-label="Layer options"]');
    },
    buttonRenameLayer: `#layerview-menu[tabindex="0"] [item="rename-layer"]`,
    inputLayerName: '#update-layer-name input',
    buttonSaveLayerName: '#update-layer-name button[name=save]',
    deleteLayerButton: '#layerview-menu[tabindex="0"] [item=delete]',
    deleteConfirmButton: '#cannot-undo-dialog button[name=delete]',
    getAllLayers: async () => browser.page.$$('#featurelist-scrollable-container [layerid]'),
    searchBar: '#mapsprosearch-field',
    addToLocationMap: '#addtomap-button',
    editStyle: '#map-infowindow-style-button',
    colorItem: (color) => `#stylepopup-color [aria-label="${color}"]`,
    moreIconsButon: "#stylepopup-moreicons-button",
    iconButon: (icon) => `[role="dialog"] [aria-label="${icon}"]`,
    saveIconButon: '[role="dialog"] button[name="ok"]',
    editLocationName: '#map-infowindow-edit-button',
    nameInput: '#map-infowindow-attr-name-value',
    descriptionInput: '#map-infowindow-attr-description-value',
    dialogLocationSaveButton: '#map-infowindow-done-editing-button [role=button]'
};

const getAllLayersNames = async () => {
    return await browser.page.$$eval(
        selectors.allLayersHeader, 
        eval(`(headers) => { 
            return headers.map(dom => dom.textContent)
        }`)
    );
};

const deleteLayer = async (layerIndex) => {
    console.log('[LOG] deleteLayer: ', layerIndex);
    const optionButton = await selectors.getOptionButtonByLayerIndex(layerIndex);
    await optionButton.click();
    await browser.page.click(selectors.deleteLayerButton);
    return await browser.page.click(selectors.deleteConfirmButton);
};

const selectLayer = async (layerIndex) => {
    console.log('[LOG] selectLayer: ', layerIndex);

    const layerElement = await selectors.getHeaderByLayerIndex(layerIndex);
    return await layerElement.click();
};

const createLayer = async (layerName, layerIndex) => {
    console.log('[LOG] createLayer: ', layerName, layerIndex);
    await browser.page.click(selectors.addLayer);
    await selectors.waitButtonLayerOptionByLayerIndex(layerIndex);
    const optionButton =  await selectors.getOptionButtonByLayerIndex(layerIndex);
    await optionButton.click();
    await browser.page.waitForSelector(selectors.buttonRenameLayer);
    await browser.page.click(selectors.buttonRenameLayer);
    await browser.page.waitForSelector(selectors.inputLayerName);
    await browser.page.type(selectors.inputLayerName, layerName);
    return await browser.page.click(selectors.buttonSaveLayerName);
};

const updateLayer = async (layerName) => {
    const layerNames = await getAllLayersNames(browser.page);
    const layerNamesLength = layerNames.length;
    const layerIndex = layerNames.findIndex(text => text === layerName);

    console.log('[LOG] layerName: ', layerName);
    console.log('[LOG] layerNames: ', layerNames);
    console.log('[LOG] layerIndex: ', layerIndex);

    if (layerIndex !== -1) {
        await selectLayer(layerIndex);
    } else {
        await createLayer(layerName, layerNamesLength);
    }
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

    await browser.page.waitFor(500); // it sometime fails here
    await browser.page.waitForSelector(selectors.addToLocationMap);
    
    // await browser.page.click(selectors.addToLocationMap); // No idea why chrome does not like it
    await browser.page.evaluate(eval(`() => {
        const element = document.querySelector('#addtomap-button');
        element.click()
        return Promise.resolve();
    }`));
    
    await browser.page.waitForSelector(selectors.editLocationName);
    // await browser.page.click(selectors.editLocationName);
    await browser.page.evaluate(eval(`() => {
        const element = document.querySelector('#map-infowindow-edit-button');
        element.click();
        return Promise.resolve();
    }`));

    await browser.page.waitFor(500); // it sometime fails here

    await browser.page.type(selectors.nameInput, row.locationName);
    await browser.page.type(selectors.descriptionInput, row.locationDescription);
    await browser.page.click(selectors.dialogLocationSaveButton);

    // change color & icon

    await browser.page.click(selectors.editStyle);

    await browser.page.click(selectors.colorItem(row.color));

    await browser.page.click(selectors.moreIconsButon);

    await browser.page.click(selectors.iconButon(row.icon));
    
    return await browser.page.click(selectors.saveIconButon);
};

module.exports = {
    deleteLayer,
    deleteAllLayers,
    updateLayer,
    addLocationToMap
};