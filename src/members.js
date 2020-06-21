const path = require('path');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const csvFilePath = path.resolve(__dirname, '../data.csv')
const csvFileContent = fs.readFileSync(csvFilePath).toString();

const getMembersData = () => {
    return parse(csvFileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
}

module.exports = {
    getMembersData 
}