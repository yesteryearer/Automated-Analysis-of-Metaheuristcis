/**
 * Analyser Component
 *
 * This component serves as the main interface for the metaheuristic analysis functionality of the application.
 *
 * Features:
 * - Integrates multiple subcomponents including AnalyserTable, AnalyserControlPanel, and ExperimentPane.
 * - Utilizes ExperimentProvider for state management related to experiment data.
 * - Retrieves experiment data passed via routing (React Router's useLocation).
 * - Processes the experiment data to a suitable format for display in AnalyserTable.
 * - Includes error handling for data processing.
 * - Employs a logger component (AnalyserLogger) enhanced with ExperimentContext for contextual logging.
 *
 * Structure:
 * - Wrapped within ExperimentProvider to provide experiment-related context.
 * - Divided into two main sections: the analyser container and the dashboard.
 * - The analyser container houses the AnalyserTable.
 * - The dashboard contains ExperimentPane and AnalyserControlPanel for user interaction and control.
 * 
 * Usage:
 * - This component is designed to be the hub for analyzing metaheuristic algorithm data.
 * - Users can view processed experiment data and interact with controls to analyze the data further.
 *
 * Styling:
 * - Uses 'Analyser.css' for specific styling related to the analyser layout and components.
 */

import React, { FunctionComponent } from 'react';
import AnalyserTable from './AnalyserTable';
import AnalyserControlPanel from './AnalyserControlPanel';
import ExperimentPane from '../experiment-pane/ExperimentPane';
import ExperimentProvider from '../../contexts/ExperimentProvider'; 
import { ExperimentContext } from '../../contexts/ExperimentContext'; 
import './Analyser.css';
import withContext from '../logger/LoggerWithContext';
import { useLocation } from 'react-router-dom';
import processExperimentTable from '../../utils/tables/ProcessExperimentTable';

const Analyser: FunctionComponent = () => {
    const AnalyserLogger = withContext(ExperimentContext);

    const location = useLocation();
    const experimentData = location.state?.data.experimentData;
    let processedTable: string[][] | undefined = undefined;

    if (experimentData && Array.isArray(experimentData.experimentTable)) {
        try {
            processedTable = processExperimentTable({ experimentTable: experimentData.experimentTable });
        } catch (error) {
            console.error('Error processing experiment table:', error);
        }
    }

    return (
        <ExperimentProvider>
            <div className='main-content'>
                <div className='analyser-container'>
                    <h1>Metaheuristic Analyser</h1>
                    <AnalyserTable experimentData={processedTable}/>
                </div>
                <div className='dashboard'>
                    <ExperimentPane experimentData={experimentData}/>
                    <AnalyserControlPanel />
                    <AnalyserLogger />
                </div>
            </div>
        </ExperimentProvider>
    );
};

export default Analyser;