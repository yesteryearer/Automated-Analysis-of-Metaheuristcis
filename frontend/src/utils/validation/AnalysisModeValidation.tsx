import { Analysis, LogClass } from '../../types'

function validateAnalysisMode(currentMode: Analysis, selectedRows: number[], rowCount: number, createLog: (message: string, logClass: LogClass) => void): void {
    try {
        testAnalysisMode(currentMode, selectedRows, rowCount);
        createLog('Analysis mode validated.', LogClass.SUCCESS);
    } catch (error) {
        createLog((error as Error).message, LogClass.WARNING);
        throw new Error('Analysis mode validation failed.');
    }   
}

function testAnalysisMode(currentMode: Analysis, selectedRows: number[], rowCount: number) {
    switch (currentMode) {
        case Analysis.PAIRWISE:
            if (selectedRows.length < 2) {
                throw new Error('At least two rows must be selected for pairwise analysis.');
            } else if (selectedRows.length > 2) {
                throw new Error('More than two rows cannot be selected for pairwise analysis.');
            }
            break;
        case Analysis.CONTROL:
            if (selectedRows.length < 1) {
                throw new Error('At least one row must be selected for control analysis.');
            } else if (selectedRows.length > 1) {
                throw new Error('More than one row cannot be selected for control analysis.');
            }
            break;
        case Analysis.ALL:
            if (selectedRows.length !== rowCount - 1){
                throw new Error('All rows must be selected for all analysis.');
            }
            break;
        default:
            throw new Error('Invalid and unknown analysis mode.');
    }
}

export default validateAnalysisMode