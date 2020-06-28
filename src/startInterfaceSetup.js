const browser = require('./pupeteerInstance');
const { saveSetup } = require('./setupInstance');

const startInterfaceSetup = async () => {
    await browser.page.goto('http://localhost:3000/');
    
    await browser.page.waitFor(eval(`() => {
        return mockOnSubmit.calls > 0;
    }`), { timeout: 0 });

    const formData = await browser.page.evaluate(eval(`async () => {
        const formData = new FormData(document.querySelector('#form-setup'));

        const PAGE = formData.get('google-map-page');
        const DATA_SOURCE_CSV = await formData.get('data-source-csv').text();
        const DATA_MAP_CSV = await formData.get('data-map-csv').text();
        
        const transferData = {
            PAGE,
            DATA_SOURCE_CSV,
            DATA_MAP_CSV,
        };
        
        console.log(transferData);

        return transferData;
    }`));

    console.log('[LOG] Setup Data', formData);

    saveSetup(formData);
}

module.exports = {
    startInterfaceSetup
}