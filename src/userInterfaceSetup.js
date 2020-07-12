const browser = require('./pupeteerInstance');
const { saveUserSetup } = require('./setupInstance');

const startInterfaceSetup = async () => {
    await browser.page.goto('http://localhost:3000/');
    
    await browser.page.waitFor(eval(`() => window.puppeteerData !== undefined && window.puppeteerData !== null`), { timeout: 0 });

    const formData = await browser.page.evaluate(eval(`async () => window.puppeteerData`));

    console.log('[LOG] Setup Data', formData);

    saveUserSetup(formData);
}

module.exports = {
    startInterfaceSetup
}