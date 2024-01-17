/**
 * Result Context
 *
 * This context is designed to provide a centralized way to manage and share state related to analysis results across various components.
 *
 * State Elements:
 * - logs: An array of log messages for tracking user actions and system events.
 * - experimentName: Name of the current experiment.
 * - analysisResult: Data resulting from the analysis.
 * - analysisName: Name of the current analysis.
 * - analysisNotes: Notes or comments related to the analysis.
 * - experimentDescription: Description or additional details of the experiment.
 *
 * Each state element is accompanied by a corresponding setter function to update its value.
 *
 * Usage:
 * - Components that need access to these state elements can consume this context using the useContext hook.
 * - This context is provided at a higher level in the component tree by the ResultProvider.
 *
 * Example:
 * const { analysisResult, setAnalysisResult, createLog } = useContext(ResultContext);
 */

import React, { Dispatch, SetStateAction } from 'react';
import { Log, LogClass} from '../types';

export const ResultContext = React.createContext({
    logs: [] as Log[],
    setLogs: (() => {}) as Dispatch<SetStateAction<Log[]>>,
    createLog: (() => {}) as (message: string, logClass: LogClass) => void,
    experimentName: '' as string,
    setExperimentName: (() => {}) as Dispatch<SetStateAction<string>>,
    analysisResult: [] as any,
    setAnalysisResult: (() => {}) as Dispatch<SetStateAction<any>>,
    analysisName: '' as string,
    setAnalysisName: (() => {}) as Dispatch<SetStateAction<string>>,
    analysisNotes: '' as string,
    setAnalysisNotes: (() => {}) as Dispatch<SetStateAction<string>>,
    experimentDescription: '' as string,
    setExperimentDescription: (() => {}) as Dispatch<SetStateAction<string>>,
});