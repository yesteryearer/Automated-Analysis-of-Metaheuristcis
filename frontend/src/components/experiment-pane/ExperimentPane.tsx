import React, { FunctionComponent, useState, ChangeEvent, useContext, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MinimiserButton from '../buttons/MinimiserButton';
import { ExperimentContext } from '../../contexts/ExperimentContext';
import validateExperimentTable from '../../utils/validation/TableValidation';
import validateAnalysisMode from '../../utils/validation/AnalysisModeValidation';
import validateAlpha from '../../utils/validation/AlphaValidation';
import ComparisonOptions from './ComparisonOptions';
import './ExperimentPane.css';
import { LogClass } from '../../types';
import { requestAnalysis } from '../../api/analysis/AnalysisApi';

interface ExperimentPaneProps {
    experimentData?: any | undefined;
}

const ExperimentPane: FunctionComponent<ExperimentPaneProps> = ({experimentData}) => {
    const {experimentDescription, setExperimentDescription, alpha, setAlpha, tableData, selectedRows, createLog, setLogs, setExperimentName, experimentName, analysisMode, optimizationMode} = useContext(ExperimentContext);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isValidationPassed, setIsValidationPassed] = useState(false);
    const navigate = useNavigate();
    const prevIsValidationPassed = useRef(isValidationPassed);
    const [alphaInput, setAlphaInput] = useState('0.05');
    let timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (experimentData && experimentData !== undefined) {
            if (typeof experimentData.experimentName === 'string') {
                setExperimentName(experimentData.experimentName);
            }
            if (typeof experimentData.experimentDescription === 'string') {
                setExperimentDescription(experimentData.experimentDescription);
            }
            if (typeof experimentData.alpha === 'number') {
                setAlpha(experimentData.alpha);
                setAlphaInput(experimentData.alpha.toString());
            }
            createLog('Experiment data loaded.', LogClass.SUCCESS);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setExperimentDescription(event.target.value);
    };

    const handleExperimentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setExperimentName(event.target.value);
    };

    const validateAndSetAlpha = useCallback((value: string) => {
        const numericRegex = /^[0-9]*\.?[0-9]+$/;
        if (numericRegex.test(value)) {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                setAlpha(numericValue);
            }
        } else {
            setAlphaInput(alpha.toString());
            createLog('Alpha must be a numeric value.', LogClass.ERROR);
        }
    }, [alpha, setAlpha, createLog]);

    const handleAlphaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAlphaInput(value);

        if (timeoutId.current !== null) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            validateAndSetAlpha(value);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (timeoutId.current !== null) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    const handleAnalyseClick = () => {
        try {
            setLogs([]);
            createLog('Analysis validation initiated.', LogClass.INFO);
            validateAnalysisMode(analysisMode, selectedRows, tableData.length, createLog);
            validateAlpha(alpha, createLog);
            validateExperimentTable(tableData, createLog);
            createLog('Validation phase passed. Confrim analysis procedure.', LogClass.SUCCESS);
            setIsValidationPassed(true);
        } catch (error) {
            setIsValidationPassed(false);
            createLog((error as Error).message, LogClass.ERROR);
            createLog('Validation failed. Aborting analysis.', LogClass.ERROR);
        }
    };

    useEffect(() => {
        if (prevIsValidationPassed.current) {
            setIsValidationPassed(false);
            createLog('State altered. Aborting confirmation of analysis.', LogClass.WARNING);
        }
        prevIsValidationPassed.current = isValidationPassed;
    }, [tableData, selectedRows, analysisMode, createLog, isValidationPassed, optimizationMode]);

    const handleConfirmClick = () => {
        requestAnalysis(alpha, experimentName, analysisMode, tableData, selectedRows, optimizationMode, experimentDescription)
            .then(data => {
                navigate('/results', { state: { data: data.result } });
            })
            .catch(error => {
                createLog((error as Error).message, LogClass.ERROR);
                createLog('Analysis failed. Please try again.', LogClass.ERROR);
                setIsValidationPassed(false);
            });
    };
    
    const handleCancelClick = () => {
        setIsValidationPassed(false);
        createLog('Analysis cancelled.', LogClass.WARNING);
    };

    return (
        <div className={`experiment-pane-container ${isPanelOpen ? 'open' : 'close'}`}>
            <div className='mount'>
                <h2>Experiment</h2>
                <MinimiserButton isOpen={isPanelOpen} setState={setIsPanelOpen} />
            </div>

            {isPanelOpen && (
            <>
                <label>
                    Name:
                    <input type="text" value={experimentName} onChange={handleExperimentNameChange} />
                </label>

                <label>
                    Alpha - α:
                    <input type="text" value={alphaInput} onChange={handleAlphaChange} />
                </label>

                <div className="description-container">
                    <label htmlFor="description">Notes:</label>
                    <textarea id="description" name="description" value={experimentDescription} onChange={handleDescriptionChange}></textarea>
                </div>

                <ComparisonOptions />
           
                {isValidationPassed ?
                (
                    <div className="button-container">
                        <button onClick={handleConfirmClick}>Confirm</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) :
                (
                    <button onClick={handleAnalyseClick}>Analyse</button>
                )}
            </>
            )}
        </div>
    );
};

export default ExperimentPane;
