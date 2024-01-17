/**
 * Analyser Table Component
 *
 * This component renders a dynamic table for displaying and manipulating experiment data.
 *
 * Features:
 * - Displays data passed in via 'experimentData' prop.
 * - Allows adding and removing rows and columns dynamically.
 * - Enables editing individual cell values in the table.
 * - Utilizes the ExperimentContext for accessing and updating the table data.
 * - Implements custom logic for adding/removing rows and columns using utility functions.
 *
 * Props:
 * - experimentData: A 2D array of strings representing the experiment data to be displayed.
 *
 * State and Context:
 * - Accesses and modifies the 'tableData' state from ExperimentContext.
 * - Uses React's useEffect to initialize the table data from the experimentData prop.
 * - useCallback is employed for optimized event handler functions that depend on context methods.
 *
 * Styling:
 * - Uses 'AnalyserTable.css' for styling specific to the table.
 * - Table headers and footers have customized styling for aesthetic consistency.
 *
 * Usage:
 * - This component is utilized within the Analyser component to present experiment data in a table format.
 * - Users can interact with the table to modify its structure and content as needed for analysis.
 */

import React, { FunctionComponent, useCallback, useContext, useEffect } from 'react';
import { addRow, removeRow, addColumn, removeColumn } from '../../utils/tables/TableUtils';
import { ExperimentContext } from '../../contexts/ExperimentContext';
import { Table, Button } from 'react-bootstrap';
import AnalyserTableRow from './AnalyserTableRow';
import './AnalyserTable.css';

interface AnalyserTableProps {
    experimentData: string[][] | undefined;
}

const AnalyserTable: FunctionComponent<AnalyserTableProps> = ({experimentData}) => {
    const { tableData, setTableData } = useContext(ExperimentContext);

    useEffect(() => {
        if (experimentData && experimentData.length !== 0) {
            setTableData(experimentData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCellValueChange = useCallback((rowIndex: number, columnIndex: number, value: string) => {
        setTableData(prevTableData => prevTableData.map((row, currentRowIndex) => 
            currentRowIndex !== rowIndex ? row : row.map((cell, currentColumnIndex) => 
            currentColumnIndex !== columnIndex ? cell : value)));
    }, [setTableData]);

    const handleAddRowOrColumn = useCallback((isRowOperation: boolean) => {
        setTableData((prevTableData: string[][]) => {
            const newTableData = isRowOperation ? addRow(prevTableData) : addColumn(prevTableData);
            return newTableData as string[][];
        });
    }, [setTableData]);

    const handleRemoveRowOrColumn = useCallback((isRowOperation: boolean, index: number) => {
        setTableData(prevTableData => isRowOperation ? removeRow(prevTableData, index) : removeColumn(prevTableData, index));
    }, [setTableData]);

    return (
        <Table>
            <thead>
                <tr>
                    <th className='borderless'></th>
                    <th className='borderless' style={{ borderRight: '1px solid var(--text-color)' }}>Algorithms</th>
                    <th className='borderless' colSpan={tableData[0]?.length + 2}>Benchmarks</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th className='borderless'></th>
                    <td colSpan={tableData[0]?.length} className='borderless' style={{ borderTop: '1px solid var(--text-color)' }}></td>
                </tr>
                {tableData.map((row, rowIndex) => (
                    <AnalyserTableRow
                        key={rowIndex}
                        rowIndex={rowIndex}
                        row={row}
                        handleCellValueChange={handleCellValueChange}
                        handleRemoveRow={() => handleRemoveRowOrColumn(true, rowIndex)}
                        handleAddColumn={() => handleAddRowOrColumn(false)}
                    />
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th className='borderless'></th>
                    <th className='borderless'>
                        <Button className='button add-button' variant='link' onClick={() => handleAddRowOrColumn(true)}/>
                    </th>

                    {tableData[0]?.slice(0, -1).map((_, columnIndex) => (
                        <th className='borderless' key={columnIndex}>
                            <Button className='button remove-button' variant='link' onClick={() => handleRemoveRowOrColumn(false, columnIndex + 1)}/>
                        </th>
                    ))}
                        
                </tr>
            </tfoot>
        </Table>
    );
};

export default AnalyserTable;