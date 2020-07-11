const parse = require('csv-parse/lib/sync');
const compile = require("string-template/compile");

const removeWhiteSpaces = (text) => text.replace(/\s/g, '');
const removeVariableWhiteSpaces = (text) => text.replace(/(?<=(\{\w+))\s(?=(\w+\}))/g, '');

const mapsToTemplate = (maps) => {
    const mappingsKeys = Object.keys(maps);

    return mappingsKeys.reduce((accumulator, mapName) => {
        const mappingsValue = removeVariableWhiteSpaces(maps[mapName]);

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

const getCompiledUserInstructions = (DATA_SOURCE_CSV, DATA_MAP_CSV) => {
    const contentParsed = parse(DATA_SOURCE_CSV, {
        columns: header => header.map(removeWhiteSpaces),
        skip_empty_lines: true,
        trim: true,
    });

    const mappingParsed = parse(DATA_MAP_CSV, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    })[0];

    const mappingTemplate = mapsToTemplate(mappingParsed);

    const mappedContent = contentParsed
        .map((contentRow) => mappingContent(mappingTemplate, contentRow));

    return mappedContent;
}

module.exports = {
    getCompiledUserInstructions
}