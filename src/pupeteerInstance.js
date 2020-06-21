const CONFIG = require('./config.json');
const puppeteer = require('puppeteer');

class Pupeteer {
    page = null;

    start = async (websocketLocation) => {
        const connectOptions = {
            browserWSEndpoint: websocketLocation,
            defaultViewport: {
                width: parseInt(CONFIG.SCREEN_WIDTH),
                height: parseInt(CONFIG.SCREEN_HEIGHT)
            },
            slowMo: parseInt(CONFIG.SLOW_MO)
        };
    
        const browser = await puppeteer.connect(connectOptions)
        this.page = await browser.newPage();
    }
}

const pupeteerInstance = new Pupeteer();

module.exports = pupeteerInstance;