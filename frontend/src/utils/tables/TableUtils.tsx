
const addRow = (prevTableData: string[][]) => [...prevTableData, Array(prevTableData[0].length).fill('')];
const addColumn = (prevTableData: string[][]) => prevTableData.map((row) => [...row, '']);
const removeRow = (prevTableData: string[][], index: number) => prevTableData.filter((_, i) => i !== index);
const removeColumn = (prevTableData: string[][], index: number) => prevTableData.map((row) => row.filter((_, i) => i !== index));

const extractTableData = (tableData: string[][]): { [key: string]: string }[] => {
    return tableData.map((row) => {
        return row.reduce((acc: { [key: string]: string }, cell, index) => {
            acc[`column${index + 1}`] = cell;
            return acc;
        }, {});
    });
};


export { addRow, removeRow, addColumn, removeColumn, extractTableData };