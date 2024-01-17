import React, { FC, ChangeEvent, useContext } from 'react';
import { ExperimentContext } from '../../contexts/ExperimentContext';
import { OptimizationMode, Analysis, LogClass } from '../../types';

const ComparisonOptions: FC = () => {
    const { setAnalysis, createLog, analysisMode, optimizationMode, setOptimizationMode } = useContext(ExperimentContext);

    const handleAnalysisChange = (event: ChangeEvent<HTMLInputElement>) => {
        switch(event.target.value) {
            case "pairwise":
                setAnalysis(Analysis.PAIRWISE);
                createLog('Pairwise (1v1) analysis selected.', LogClass.INFO);
                break;
            case "control":
                setAnalysis(Analysis.CONTROL);
                createLog('Control (1vN) analysis selected.', LogClass.INFO);
                break;
            case "all":
                setAnalysis(Analysis.ALL);
                createLog('All (NvN) analysis selected.', LogClass.INFO);
                break;
            default:
                console.log("Invalid option");
        }
    }; 

    const handleOptimizationChange = (event: ChangeEvent<HTMLInputElement>) => {
        switch(event.target.value) {
            case "minimize":
                setOptimizationMode(OptimizationMode.MINIMIZE);
                createLog('Minimize optimization selected.', LogClass.INFO);
                break;
            case "maximize":
                setOptimizationMode(OptimizationMode.MAXIMIZE);
                createLog('Maximize optimization selected.', LogClass.INFO);    
                break;
            default:
                console.log(event.target.value);
                console.log("Invalid option");
        }
    };

    return (
        <>
            <label>
                Analysis Mode:
                <fieldset>
                    <label className='label-radio-button'>
                        <input type="radio" value={Analysis.PAIRWISE} checked={analysisMode === Analysis.PAIRWISE} onChange={handleAnalysisChange} />
                        Pairwise (1v1)
                    </label>
                    <label className='label-radio-button'>
                        <input type="radio" value={Analysis.CONTROL} checked={analysisMode === Analysis.CONTROL} onChange={handleAnalysisChange} />
                        Control (1vN)
                    </label>
                    <label className='label-radio-button'>
                        <input type="radio" value={Analysis.ALL} checked={analysisMode === Analysis.ALL} onChange={handleAnalysisChange} />
                        All (NvN)
                    </label>
                </fieldset>

            </label>

            <label>
            Optimization Mode:

            <fieldset> 
                <label className='label-radio-button'>
                    <input type="radio" value={OptimizationMode.MINIMIZE} checked={optimizationMode === OptimizationMode.MINIMIZE} onChange={handleOptimizationChange} />
                    Minimize
                </label>
                <label className='label-radio-button'>
                    <input type="radio" value={OptimizationMode.MAXIMIZE} checked={optimizationMode === OptimizationMode.MAXIMIZE} onChange={handleOptimizationChange} />
                    Maximize
                </label>
            </fieldset>
            </label>
        </>
    );
};

export default ComparisonOptions;
