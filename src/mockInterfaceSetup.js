const path = require('path');
const fs = require('fs');
const { saveUserSetup } = require('./setupInstance');
const pageFile = path.resolve(__dirname, '../sample_data/page.txt')
const csvDataFile = path.resolve(__dirname, '../sample_data/data.csv')
const csvMapFile = path.resolve(__dirname, '../sample_data/map.csv')

const mockInterfaceSetup = () => {
    const pageString = fs.readFileSync(pageFile).toString();
    const csvDataString = fs.readFileSync(csvDataFile).toString();
    const csvMapString = fs.readFileSync(csvMapFile).toString();

    const formData = {
        PAGE: pageString,
        DATA_SOURCE_CSV: csvDataString,
        DATA_MAP_CSV: csvMapString
    };

    console.log('[LOG] Mock Setup Data', formData);

    saveUserSetup(formData);
}

module.exports = {
    mockInterfaceSetup
}