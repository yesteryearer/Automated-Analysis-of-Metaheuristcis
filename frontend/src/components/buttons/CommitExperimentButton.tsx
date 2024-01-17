import React, { useCallback, useContext } from 'react';
import { LogClass } from "../../types";
import { Button } from 'react-bootstrap';
import validateExperimentTable from '../../utils/validation/TableValidation';
import { submitExperiment } from '../../api/experiments/ExperimentsApi';
import { ExperimentContext } from '../../contexts/ExperimentContext';;

const CommitExperimentButton: React.FC = () => {

    const { experimentDescription, tableData, experimentName, createLog, optimizationMode, alpha } = useContext(ExperimentContext);

    const validateExperiment = useCallback(async () => {
        if (experimentName.trim() === '') {
            createLog('Experiment name cannot be empty.', LogClass.ERROR);
            createLog('Failed to commit experiment to the database.', LogClass.ERROR);
            return;
        }
      
        try {
            validateExperimentTable(tableData, createLog);
            await submitExperiment(experimentName, tableData, optimizationMode, alpha, experimentDescription);
            createLog('Experiment committed to the database.', LogClass.SUCCESS);
        } catch (error) {
            createLog((error as Error).message, LogClass.ERROR);
            createLog('Failed to commit experiment to the database.', LogClass.ERROR);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [tableData, experimentName, createLog]);      

    return (
        <Button onClick={validateExperiment}>Commit Table</Button>
    );
};

export default CommitExperimentButton;