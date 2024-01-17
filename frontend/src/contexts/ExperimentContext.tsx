/**
 * Experiment Context
 *
 * This context provides a centralized way to manage and share state related to experiments across various components.
 *
 * State Elements:
 * - alpha: The significance level for statistical tests.
 * - tableData: Data of the experiment in a table format.
 * - logs: Array of log messages for tracking user actions and system events.
 * - experimentName: Name of the current experiment.
 * - analysisMode: Current analysis mode (e.g., PAIRWISE, CONTROL).
 * - optimizationMode: Mode of optimization (e.g., MINIMIZE, MAXIMIZE).
 * - selectedRows: Indices of selected rows in the experiment table.
 * - experimentDescription: Description or additional details of the experiment.
 *
 * Each state element comes with a corresponding setter function to update its value.
 *
 * Usage:
 * - Components that need access to these state elements can consume this context using the useContext hook.
 * - This context is provided at a higher level in the component tree by the ExperimentProvider.
 * 
 * Example:
 * const { alpha, setAlpha, tableData, setTableData } = useContext(ExperimentContext);
 */

import React, { Dispatch, SetStateAction } from 'react';
import { Log, LogClass, Analysis, OptimizationMode } from '../types';

export const ExperimentContext = React.createContext({
    alpha: 0.05,
    setAlpha: (() => {}) as Dispatch<SetStateAction<number>>,
    tableData: [] as string[][],
    setTableData: (() => {}) as Dispatch<SetStateAction<string[][]>>,
    logs: [] as Log[],
    setLogs: (() => {}) as Dispatch<SetStateAction<Log[]>>,
    experimentName: '',
    setExperimentName: (() => {}) as Dispatch<SetStateAction<string>>,
    createLog: (() => {}) as (message: string, logClass: LogClass) => void,
    analysisMode: Analysis.PAIRWISE,
    optimizationMode: OptimizationMode.MINIMIZE,
    setOptimizationMode: (() => {}) as Dispatch<SetStateAction<OptimizationMode>>,
    setAnalysis: (() => {}) as Dispatch<SetStateAction<Analysis>>,
    selectedRows: [] as number[],
    setSelectedRows: (() => {}) as Dispatch<SetStateAction<number[]>>,
    experimentDescription: '' as string,
    setExperimentDescription: (() => {}) as Dispatch<SetStateAction<string>>,
});

