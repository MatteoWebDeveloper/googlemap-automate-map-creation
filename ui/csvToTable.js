export const csvToTable = (csvString) => {
    const csvRows = csvString.trim().split('\n');
    const csvStructure = csvRows
        .map(row => row
            .split(',')
            .map(cell => cell.trim())
        );
    
    const columns = csvStructure.splice(0, 1)[0];
    
    const tableColumns = columns.map((columnName) => ({
        title: columnName,
        dataIndex: columnName,
        key: columnName,
    }));
    
    const tableContent = csvStructure.map((row, index) => {
        const rowContent = row.reduce((accumulator, currentValue, index) => {
            const columnName = columns[index];
            console.log()
            
            return { 
                ...accumulator, 
                [columnName]: currentValue
            };
        }, {});
    
        return {
            key: (index + 1).toString(),
            ...rowContent
        }
    });

    return {
        columns: tableColumns,
        content: tableContent
    }
};