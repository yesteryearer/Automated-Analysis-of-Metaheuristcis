import { LogClass } from "../../types";

function valueFound(value: string): string {
    return value === "" ? "Cell was empty." : 'Value found: ' + value + '.';
}

function validateExperimentTable(tableData: any[], createLog: (message: string, logClass: LogClass) => void) {
    try {
        testExperimentTable(tableData);
        createLog('Table successfully validated.', LogClass.SUCCESS);
    } catch (error) {
        createLog((error as Error).message, LogClass.WARNING);
        throw new Error('Validation failed.');
    }
}

function testExperimentTable(table: string[][]): void {
    if (table.length === 0 || table[0].length === 0) {
        throw new Error('Table is empty');
    }

    if (table[0].length < 2) {
        throw new Error('There should be at least one benchmark function.');
    }
    
    if (table.length < 2) {
        throw new Error('There should be at least one algorithm.');
    }

    if (table[0][0] !== "") {
        throw new Error(`First cell of first row must be empty. ${valueFound(table[0][0])}.`);
    }

    let columnValuesSet = new Set();
    for (let i = 1; i < table[0].length; i++) {
        if (!/^[a-z0-9\-_*#$]+$/i.test(table[0][i])) {
            throw new Error(`Cell [0][${i}] must be alphanumeric or contain any of these symbols: -, _, *, $, #. ${valueFound(table[0][i])}`);
        }

        columnValuesSet.add(table[0][i]);
    }

    if (columnValuesSet.size !== table[0].length - 1) {
        throw new Error(`Duplicate benchmark identifiers detected.`);
    }

    let rowValuesSet = new Set();
    for (let i = 1; i < table.length; i++) {
        if (!/^[a-z0-9\-_*#$]+$/i.test(table[i][0])) {
            throw new Error(`Cell [${i}][0] must be alphanumeric or contain any of these symbols: -, _, *, $, #. ${valueFound(table[i][0])}`);
        }

        rowValuesSet.add(table[i][0]);
    }

    if (rowValuesSet.size !== table.length - 1) {
        throw new Error(`Duplicate algorithm identifiers detected.`);
    }

    for (let i = 1; i < table.length; i++) {
        for (let j = 1; j < table[i].length; j++) {
            if (!/^[\d.]+(?:e-?\d+)?$/i.test(table[i][j])) {
                throw new Error(`Cell [${i}][${j}] must be numeric (scientific notation allowed). 
                ${valueFound(table[i][j])}`);
            }
        }
    }
}

export default validateExperimentTable;