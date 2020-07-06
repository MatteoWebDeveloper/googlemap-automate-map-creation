export const csvToTable = (csvString) => {
    const csvRows = csvString.trim().split('\n');
    const tableRows = csvRows
        .map(row => row
            .split(',')
            .map(cell => cell.trim())
        );
    
    const tableColumns = tableRows.splice(0, 1)[0];

    return {
        columns: tableColumns,
        rows: tableRows
    }
};