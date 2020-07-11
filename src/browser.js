const { spawn } = require('child_process');
const CONFIG = require('./config.json');
const args = ["--remote-debugging-port=9222", "--no-first-run", "--no-default-browser-check", "--start-fullscreen"];

const getWebsocketLocation = (buffer) => {
    const logString = buffer.toString();
    const regex = /ws:\/\/.+/;
    const matchedStringArray = logString.match(regex);

    // avoid to do operation with no match
    if (!matchedStringArray) {
        return "";
    }

    return matchedStringArray[0];
}

const startBrowser = async () => new Promise((resolve) => {
    const osChromeMappaings = {
        "win32": CONFIG.CHROME_WIN_EXE_PATH,
        "darwin": CONFIG.CHROME_MAC_EXE_PATH
    };

    const EXE_PATH = osChromeMappaings[process.platform];

    const ls = spawn(EXE_PATH, args);

    ls.stderr.on('data', (buffer) => {
        const webpackLocation = getWebsocketLocation(buffer);

        if (!webpackLocation) {
            return
        }

        resolve(webpackLocation);
    });
});

module.exports = {
    startBrowser
}    
