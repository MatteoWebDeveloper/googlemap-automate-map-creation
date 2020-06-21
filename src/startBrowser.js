const { spawn } = require('child_process');
const ENV = require('dotenv').config().parsed;
const args = ["--remote-debugging-port=9222", "--no-first-run", "--no-default-browser-check"];

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

const startBrowser = async () => new Promise((resolve, reject) => {
    spawn(ENV.CHROME_EXE_PATH, args)
        .stderr
        .on('data', (buffer) => {
            const webpackLocation = getWebsocketLocation(buffer);
            resolve(webpackLocation);
        });
});

module.exports = {
    startBrowser
}    
