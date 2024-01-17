/**
 * Result Provider Component
 *
 * This component serves as a context provider for managing and sharing state related to analysis results across the application.
 *
 * State Management:
 * - Maintains state elements such as logs, experiment name, analysis results, analysis notes, and experiment description.
 * - Utilizes useState for managing these states.
 * - Provides a function 'createLog' to update logs, encapsulating log management logic.
 *
 * Props:
 * - children: Child components that will consume the context provided by ResultProvider.
 *
 * Context:
 * - Offers a centralized state management hub for components related to the results of experiments and analyses.
 * - Enables child components to access and manipulate shared state elements related to results.
 * 
 * Usage:
 * - Wrap any component that requires access to state elements related to analysis results with ResultProvider.
 * - Facilitates efficient state sharing and management across different components of the application related to results.
 *
 * Example:
 * <ResultProvider>
 *   <ResultsComponent />
 * </ResultProvider>
 */

import React, { useState, useCallback } from 'react';
import { ResultContext } from './ResultContext';
import { Log, LogClass } from '../types';
import { createLog as createLogFunction} from '../utils/LoggerUtils';

const ResultProvider = ({ children }: { children: React.ReactNode }) => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [experimentName, setExperimentName] = useState<string>('unnamed');
    const [analysisName, setAnalysisName] = useState<string>('unnamed');
    const [analysisResult, setAnalysisResult] = useState<any>([]);
    const [analysisNotes, setAnalysisNotes] = useState<string>('');
    const [experimentDescription, setExperimentDescription] = useState<string>('');

    const createLog = useCallback((message: string, logClass: LogClass) => {
        createLogFunction(setLogs, message, logClass);
    }, [setLogs]);
    

    return (
        <ResultContext.Provider value={{
            logs,
            setLogs,
            createLog,
            experimentName,
            setExperimentName,
            analysisResult,
            setAnalysisResult,
            analysisName,
            setAnalysisName,
            analysisNotes,
            setAnalysisNotes,
            experimentDescription,
            setExperimentDescription,
        }}>
            {children}
        </ResultContext.Provider>
    );
};

export default ResultProvider;