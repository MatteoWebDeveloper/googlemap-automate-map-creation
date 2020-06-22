const path = require('path');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const compile = require("string-template/compile");
const csvFilePathContent = path.resolve(__dirname, '../data/data.csv')
const csvFilePathMap = path.resolve(__dirname, '../data/map.csv')
const csvContent = fs.readFileSync(csvFilePathContent).toString();
const csvMapping = fs.readFileSync(csvFilePathMap).toString();

const mapsToTemplate = (maps) => {
    const mappingsKeys = Object.keys(maps);

    return mappingsKeys.reduce((accumulator, mapName) => {
        const mappingsValue = maps[mapName];

        return {
            ...accumulator,
            [mapName]: compile(mappingsValue)
        }
    }, {});
};

const mappingContent = (templateMapping, contentRow) => {
    const mappingsKeys = Object.keys(templateMapping);

    return mappingsKeys.reduce((accumulator, mapName) => {
        const template = templateMapping[mapName];

        return {
            ...accumulator,
            [mapName]: template(contentRow)
        }
    }, {});
};

const getMembersData = () => {
    const contentParsed = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    const mappingParsed = parse(csvMapping, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    })[0];

    const mappingTemplate = mapsToTemplate(mappingParsed);

    const mappedContent = contentParsed
        .map((contentRow) => mappingContent(mappingTemplate, contentRow));

    return mappedContent;
}

module.exports = {
    getMembersData 
}