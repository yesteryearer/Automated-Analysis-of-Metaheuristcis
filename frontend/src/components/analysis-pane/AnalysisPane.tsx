import React, { FunctionComponent, useState, ChangeEvent, useContext, useEffect } from 'react';
import MinimiserButton from '../buttons/MinimiserButton';
import { ResultContext } from '../../contexts/ResultContext';
import './AnalysisPane.css';

interface AnalysisPaneProps {
    analysisResult: any;
    name: string;
}

const AnalysisPane: FunctionComponent<AnalysisPaneProps> = ( {analysisResult, name}) => {
    const {experimentDescription, setExperimentDescription, analysisNotes, setAnalysisNotes, setAnalysisName, analysisName, setAnalysisResult} = useContext(ResultContext);
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    useEffect(() => {
        if (analysisResult && analysisResult !== undefined) {
            setAnalysisResult(analysisResult);
            
            if (name !== undefined) {
                setAnalysisName(name);
            } else {
                setAnalysisName(analysisResult.analysisName);
            }

            setAnalysisNotes(analysisResult.analysisNotes);
            setExperimentDescription(analysisResult.experimentDescription)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnalysisNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnalysisName(event.target.value);
    };

    const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnalysisNotes(event.target.value);
    };

    return (
        <div className={`analysis-pane-container ${isPanelOpen ? 'open' : 'close'}`}>
            <div className='mount'>
                <h2>Analysis</h2>
                <MinimiserButton isOpen={isPanelOpen} setState={setIsPanelOpen} />
            </div>

            {isPanelOpen && (
            <>
                <label>
                    Name:
                    <input type="text" value={analysisName} onChange={handleAnalysisNameChange} />
                </label>

                <label>
                    Experiment:
                    <input type="text" value={analysisResult.experimentName} readOnly/>
                </label>

                <label>
                    Alpha - α:
                    <input type="text" value={analysisResult.alpha} readOnly/>
                </label>

                <div className="description-container">
                    <label htmlFor="description">Experiment Description:</label>
                    <textarea id="description" name="description" value={experimentDescription} readOnly/>
                </div>

                <div className="notes-container">
                    <label htmlFor="notes">Analysis Notes:</label>
                    <textarea id="notes" name="notes" value={analysisNotes} onChange={handleNotesChange}></textarea>
                </div>
            </>
            )}
        </div>
    );
};

export default AnalysisPane;