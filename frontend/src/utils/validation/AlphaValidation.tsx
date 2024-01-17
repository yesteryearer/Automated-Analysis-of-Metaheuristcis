import { LogClass } from '../../types'

function validateAlpha(currentAlpha: number, createLog: (message: string, logClass: LogClass) => void): void {
    try {
        testAlpha(currentAlpha);
        createLog('Analysis mode validated.', LogClass.SUCCESS);
    } catch (error) {
        createLog((error as Error).message, LogClass.WARNING);
        throw new Error('Analysis mode validation failed.');
    }   
}

function testAlpha(currentAlpha: number) {
    if (currentAlpha < 0 || currentAlpha > 1) {
        throw new Error('Alpha must be between 0 and 1.');
    }
}

export default validateAlpha