import React, { FunctionComponent, useContext } from 'react';
import { Button } from 'react-bootstrap';
import arrayToLatexTable from '../../utils/tables/LatexConverter';
import { ResultContext } from '../../contexts/ResultContext';
import { LogClass } from '../../types';

type LatexTableButtonProps = {
    title: string;
    table: string[][];
};

const LatexTableButton: FunctionComponent<LatexTableButtonProps> = ({
    table,
    title,
}) => {
    const {  createLog } = useContext(ResultContext);

    const handleLatexCopy = () => {

        try {
            arrayToLatexTable(table, title);
            createLog(`Copied LaTeX table to clipboard.`, LogClass.SUCCESS);
        } 
        catch (error: unknown)
        {
            createLog(`Error copying LaTeX table to clipboard for ${error}`, LogClass.ERROR);
        } 
    }

    return <Button onClick={() => handleLatexCopy()}>
        LaTeX Table
    </Button>
    };

export default LatexTableButton;