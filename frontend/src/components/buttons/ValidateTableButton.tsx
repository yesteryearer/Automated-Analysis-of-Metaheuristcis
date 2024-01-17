import React, { FunctionComponent, useCallback, useContext } from "react";
import validateExperimentTable from '../../utils/validation/TableValidation';
import { ExperimentContext } from '../../contexts/ExperimentContext';
import { Button } from "react-bootstrap";
import { LogClass } from "../../types";

const ValidateTableButton: FunctionComponent = () => {

    const { tableData, createLog } = useContext(ExperimentContext);
    
    const validateTable = useCallback(() => {
        try {
            validateExperimentTable(tableData, createLog);
        }
        catch (error) {
            createLog('Table validation failed.', LogClass.ERROR);
        }
    }, [tableData, createLog]);
    
    return (
        <Button onClick={validateTable}>Validate Table</Button>
    )
};

export default ValidateTableButton;
