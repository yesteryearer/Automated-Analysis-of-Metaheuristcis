import React, { useContext } from 'react';
import Papa from 'papaparse';
import { ExperimentContext } from '../../contexts/ExperimentContext'; 
import { CSV_EXTENSION } from '../Constants';
import { LogClass } from '../../types';
import { Button } from 'react-bootstrap';

const UploadCsvButton: React.FC = () => {
    const { setTableData, createLog, setExperimentName } = useContext(ExperimentContext);

    const validateCsvFile = (data: string[][]) => {
        const columnCount = data[0]?.length || 0;
        for (const row of data) {
            if (row.length !== columnCount) {
                throw new Error('CSV file does not have a consistent number of columns.');
            }
        }
    };

    const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                complete: (results) => {
                    try {
                        let data = results.data as string[][];
                        if (data[data.length - 1].every(cell => cell === "")) {
                            data.pop();
                        }
                        validateCsvFile(data);
                        data = data.map(row => row.map(cell => cell.trim()));
                        setExperimentName(file.name.replace(/\.csv$/i, ''));
                        data[0][0] = '';
                        setTableData(data);
                        createLog(`Uploaded ${file.name}`, LogClass.SUCCESS);
                    } catch (error) {
                        if (error instanceof Error) {
                            createLog(`Failed to upload ${file.name}: ${error.message}`, LogClass.ERROR);
                        } else {
                            throw error;
                        }
                    }
                },
            });
        }
    };

    return (
        <>
            <Button
                as="label"
                htmlFor="file"
                variant="primary"
            >
                Upload CSV
            </Button>
            <input
                type="file"
                id="file"
                accept={CSV_EXTENSION}
                onChange={handleCsvFileChange}
                style={{ display: 'none' }}
            />
        </>
    );
}

export default UploadCsvButton;

