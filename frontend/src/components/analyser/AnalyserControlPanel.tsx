/**
 * Analyser Control Panel Component
 *
 * This component serves as the control interface for the Analyser, providing various controls to interact with experiment data.
 *
 * Features:
 * - Allows users to upload, reset, validate, and commit experiment data.
 * - Provides buttons for data extraction, analysis mode validation, and downloading the table data.
 * - Uses the ExperimentContext for accessing and manipulating shared experiment data.
 * - Manages local state for controlling panel visibility (open/close).
 * - Incorporates a memoized value for extracted table data to optimize performance.
 * - Implements custom logging for user actions and validation results.
 *
 * State and Context:
 * - Utilizes useState for managing the panel's open/close state.
 * - Accesses shared state from ExperimentContext, including table data and selected rows.
 * - Performs operations like resetting table data and creating logs through context methods.
 * 
 * Styling:
 * - Uses 'AnalyserControlPanel.css' for specific styling related to the control panel's layout and components.
 * 
 * Usage:
 * - Placed within the Analyser component, it provides users with various controls to manipulate and analyze experiment data.
 * - Each button performs a specific action, enhancing the interactivity and functionality of the experiment analysis process.
 */

import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { INITIAL_TABLE_DATA } from '../Constants';
import ExtractDataButton from '../buttons/ExtractDataButton';
import { extractTableData } from '../../utils/tables/TableUtils';
import MinimiserButton from '../buttons/MinimiserButton';
import UploadCsvButton from '../buttons/UploadCsvButton';
import ValidateTableButton from '../buttons/ValidateTableButton';
import CommitExperimentButton from '../buttons/CommitExperimentButton';
import './AnalyserControlPanel.css';
import validateAnalysisMode from '../../utils/validation/AnalysisModeValidation';
import { LogClass } from "../../types"
import { ExperimentContext } from '../../contexts/ExperimentContext';
import DownloadCSVButton from '../buttons/DownloadCSVButton';


const AnalyserControlPanel: FunctionComponent = () => {

    const {tableData, setTableData, createLog, selectedRows, analysisMode } = useContext(ExperimentContext);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const extractedTableData = useMemo(() => extractTableData(tableData), [tableData]);

    const resetTable = () => {
        setTableData(INITIAL_TABLE_DATA);
        createLog('Table reset.', LogClass.SUCCESS);
    }

    const printSelectedRows = () => {
        createLog("Selected rows: " + selectedRows.toString(), LogClass.INFO);
    }

    const validateMode = () => {
        try {
            validateAnalysisMode(analysisMode, selectedRows, tableData.length, createLog);
        } catch (error) {
            createLog((error as Error).message, LogClass.ERROR);
        }
    }

    return (
        <div className={`control-panel-container ${isPanelOpen ? 'open' : 'close'}`}>
            <div className='mount'>
                <h2>Control Panel</h2>
                <MinimiserButton isOpen={isPanelOpen} setState={setIsPanelOpen} />
            </div>

            {isPanelOpen && (
            <div className='panel-grid'> 
                <UploadCsvButton/>

                <DownloadCSVButton context={ExperimentContext} table={tableData} title='Experiment Data' />

                <Button onClick={resetTable}>Reset Table</Button>

                <Button onClick={printSelectedRows}>Print Selected Rows</Button>

                <Button onClick={validateMode}>Validate Analysis Mode</Button>

                <ValidateTableButton/>

                <CommitExperimentButton/>
                
                <ExtractDataButton extractTableData={() => extractedTableData} />
            </div>
            
            )}
        </div>
    );
};

export default AnalyserControlPanel;