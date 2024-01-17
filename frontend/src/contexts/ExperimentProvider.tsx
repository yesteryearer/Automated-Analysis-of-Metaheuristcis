/**
 * Experiment Provider Component
 *
 * This component acts as a context provider for managing and sharing the state across various components 
 * in the application related to experiments.
 *
 * State Management:
 * - Manages a variety of state elements such as alpha value, table data, logs, experiment name, 
 *   analysis mode, selected rows, optimization mode, and experiment description.
 * - Utilizes useState for local state management within the context.
 * - Provides a function 'createLog' to update logs, encapsulating the logic for log management.
 *
 * Props:
 * - children: The child components that will consume the context provided by ExperimentProvider.
 *
 * Context:
 * - Provides a centralized state management hub for components related to experiments, analysis, and logging.
 * - Allows child components to access and manipulate shared state elements related to experiments.
 * 
 * Usage:
 * - Wrap any component that requires access to the experiment-related state with ExperimentProvider.
 * - This pattern facilitates efficient state sharing and management across different components of the application.
 *
 * Example:
 * <ExperimentProvider>
 *   <Analyser />
 * </ExperimentProvider>
 */

import React, { useState, useCallback } from 'react';
import { ExperimentContext } from './ExperimentContext';
import { INITIAL_TABLE_DATA } from '../components/Constants';
import { Log, LogClass, Analysis, OptimizationMode } from '../types';
import { createLog as createLogFunction} from '../utils/LoggerUtils';

const ExperimentProvider = ({ children }: { children: React.ReactNode }) => {
    const [alpha, setAlpha] = useState<number>(0.05);
    const [tableData, setTableData] = useState<string[][]>(INITIAL_TABLE_DATA);
    const [logs, setLogs] = useState<Log[]>([]);
    const [experimentName, setExperimentName] = useState<string>('unnamed');
    const [analysisMode, setAnalysis] = useState<Analysis>(Analysis.PAIRWISE);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>(OptimizationMode.MINIMIZE);
    const [experimentDescription, setExperimentDescription] = useState('');

    const createLog = useCallback((message: string, logClass: LogClass) => {
        createLogFunction(setLogs, message, logClass);
    }, [setLogs]);
    
    return (
        <ExperimentContext.Provider value={{
            alpha,
            setAlpha,
            tableData,
            setTableData,
            logs,
            setLogs,
            createLog,
            experimentName,
            setExperimentName,
            setAnalysis,
            analysisMode,
            optimizationMode,
            setOptimizationMode,
            selectedRows,
            setSelectedRows,
            experimentDescription,
            setExperimentDescription,
        }}>
            {children}
        </ExperimentContext.Provider>
    );
};

export default ExperimentProvider;