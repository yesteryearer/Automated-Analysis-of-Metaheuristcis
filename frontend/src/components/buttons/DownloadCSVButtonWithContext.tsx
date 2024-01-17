import React, { useContext, Context } from 'react';
import Papa from 'papaparse';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { LogClass } from '../../types';

type ContextType = {
    tableData: string[][];
    createLog: (message: string, logClass: LogClass) => void;
    experimentName: string;
};

const withContext = (ContextComponent: Context<ContextType>, table: string[][], title: string) => {
    const DownloadCsvButton: React.FC = () => {
        const { createLog } = useContext(ContextComponent);
        const tableData = table;

        const handleDownloadCsv = () => {
            try {
                const csv = Papa.unparse(tableData);
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                saveAs(blob, title + ".csv");
                createLog('CSV downloaded succesfully.', LogClass.SUCCESS);
            } catch (error) {
                createLog((error as Error).message, LogClass.ERROR);
                createLog('Failed to download CSV.', LogClass.ERROR);
            }
        };

        return <Button onClick={handleDownloadCsv}>Download CSV</Button>;
    };

    return DownloadCsvButton;
};

export default withContext;
