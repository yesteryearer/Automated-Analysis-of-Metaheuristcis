import React, { useCallback, useContext } from 'react';
import { LogClass } from "../../types";
import { Button } from 'react-bootstrap';
import { submitResult} from '../../api/results/ResultsApi';
import { ResultContext } from '../../contexts/ResultContext';

const CommitResultButton: React.FC = () => {

    const { experimentDescription, analysisNotes, analysisName, analysisResult, experimentName, createLog } = useContext(ResultContext);

    const validateResult = useCallback(async () => {
        if (analysisName.trim() === '') {
            createLog('Analysis name cannot be empty.', LogClass.ERROR);
            createLog('Failed to commit result to the database.', LogClass.ERROR);
            return;
        }

        try {
            await submitResult(analysisName, experimentName, analysisResult.analysisType, analysisResult, analysisNotes, experimentDescription);
            createLog('Result committed to the database.', LogClass.SUCCESS);
        } catch (error) {
            createLog((error as Error).message, LogClass.ERROR);
            createLog('Failed to commit result to the database.', LogClass.ERROR);
        }
    }, [analysisNotes, experimentDescription, analysisName, analysisResult, experimentName, createLog]);  

    return (
        <Button onClick={validateResult}>Commit Analysis</Button>
    );
};

export default CommitResultButton;