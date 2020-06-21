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
        return await browser.page.waitFor((layerIndex) => {
            const layerElement = document.querySelectorAll('#featurelist-scrollable-container [layerid]')[layerIndex];

            return layerElement && layerElement.querySelector('[aria-label="Layer options"]') ? true : false;

        }, {}, layerIndex);
    },
    getOptionButtonByLayerIndex: async (layerIndex) => {
        const layerElement = await browser.page.$$('#featurelist-scrollable-container [layerid]');
        return await layerElement[layerIndex].$('[aria-label="Layer options"]');
    },
    buttonRenameLayer: `#layerview-menu[tabindex="0"] [item="rename-layer"]`,
    inputLayerName: '#update-layer-name input',
    buttonSaveLayerName: '#update-layer-name button[name=save]',
    deleteLayerButton: '#layerview-menu[tabindex="0"] [item=delete]',
    deleteConfirmButton: '#cannot-undo-dialog button[name=delete]'
};

const getAllLayersNames = async () => {
    return await browser.page.$$eval(selectors.allLayersHeader, (headers) => { 
        return headers.map(dom => dom.textContent)
    });
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

module.exports = {
    updateLayer,
    deleteLayer
};