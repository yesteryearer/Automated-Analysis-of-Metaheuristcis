/**
 * Analyser Table Row Component
 *
 * This component renders a single row of the Analyser table, providing functionalities for cell editing and row management.
 *
 * Props:
 * - rowIndex: The index of the current row in the table.
 * - row: An array representing the cell values of the current row.
 * - handleCellValueChange: Function to handle changes in cell values.
 * - handleRemoveRow: Function to remove the current row.
 * - handleAddColumn: Function to add a new column to the table.
 *
 * Features:
 * - Renders editable cells for each column in the row.
 * - Provides a checkbox for row selection, enabling operations based on the analysis mode.
 * - The first row and column have special styling and functionalities (like adding a column).
 * - Utilizes the ExperimentContext to access and modify shared state related to experiment data and analysis mode.
 * - Implements custom logic for row selection based on different analysis modes (PAIRWISE, CONTROL, ALL).
 *
 * Styling:
 * - Uses 'AnalyserTable.css' for specific styling related to table rows and cells.
 * 
 * Usage:
 * - Used within the AnalyserTable component to render each row of the experiment data table.
 * - Provides interactive elements for the user to manipulate the table's structure and content.
 */

import React, { FunctionComponent, ChangeEvent, useContext, useEffect } from 'react';
import { ExperimentContext } from '../../contexts/ExperimentContext';
import { Button } from 'react-bootstrap';
import { Analysis } from '../../types';

interface AnalyserTableRowProps {
    rowIndex: number;
    row: string[];
    handleCellValueChange: (rowIndex: number, columnIndex: number, value: string) => void;
    handleRemoveRow: () => void;
    handleAddColumn: () => void;
}

const AnalyserTableRow: FunctionComponent<AnalyserTableRowProps> = ({
    rowIndex, 
    row, 
    handleCellValueChange, 
    handleRemoveRow,
    handleAddColumn,
    }) => {
    
    const { analysisMode, tableData, selectedRows, setSelectedRows } = useContext(ExperimentContext);

    const handleRowSelectionChange = (rowIndex: number, checked: boolean) => {
        let newSelectedRows: number[] = [];
        
        switch (analysisMode) {
            case Analysis.PAIRWISE:
                if (checked) {
                    if (selectedRows.length < 2) {
                        newSelectedRows = [...selectedRows, rowIndex];
                    } else {
                        newSelectedRows = [selectedRows[1], rowIndex];
                    }
                } else {
                    newSelectedRows = selectedRows.filter((selectedRow) => selectedRow !== rowIndex);
                }
                break;

            case Analysis.CONTROL:
                newSelectedRows = checked ? [rowIndex] : selectedRows.filter((selectedRow) => selectedRow !== rowIndex);
                break;

            case Analysis.ALL:
                console.log(tableData.length);
                for (let i = 1; i < tableData.length + 1; i++) {
                    newSelectedRows.push(i);
                }
                break;

            default:
                console.log("Invalid option");
        }
        setSelectedRows(newSelectedRows);
    };

    useEffect(() => {
        let newSelectedRows: number[] = [];
    
        if (tableData.length === 1) {
            newSelectedRows = [];
        } else {
            switch (analysisMode) {
                case Analysis.PAIRWISE:
                    if (selectedRows.length > 2) {
                        newSelectedRows = selectedRows.slice(0, 2);
                    } else if (selectedRows.length === 0 && tableData.length > 0) {
                        newSelectedRows = [1]
                    } else {
                        newSelectedRows = selectedRows;
                    }
                    break;
                case Analysis.CONTROL:
                    if (selectedRows.length > 1) {
                        newSelectedRows = selectedRows.slice(0, 1);
                    } else {
                        newSelectedRows = selectedRows;
                    }
                    break;
                case Analysis.ALL:
                    for (let i = 1; i < tableData.length; i++) {
                        newSelectedRows.push(i);
                    }
                    break;
                default:
                    console.log("Invalid option");
            }
        }
    
        newSelectedRows = newSelectedRows.filter(index => index < tableData.length);
    
        if (JSON.stringify(newSelectedRows) !== JSON.stringify(selectedRows)) {
            setSelectedRows(newSelectedRows);
        }
    }, [analysisMode, tableData, selectedRows, setSelectedRows]);
    
    return(
        <tr>
            <th className='borderless'>
                {rowIndex !== 0 && (
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(rowIndex)}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            handleRowSelectionChange(rowIndex, event.target.checked);
                        }}
                        disabled={analysisMode === Analysis.ALL}
                    />
                )}
            </th>

            {row.map((cell, columnIndex) => (
                <td key={columnIndex}
                    className={columnIndex === 0 && rowIndex === 0 ? 'borderless' : '' + 
                    (columnIndex === 0 ? 'title-cell' : '') +
                    (rowIndex === 0 ? 'title-cell' : '') +
                    (columnIndex !== 0 && rowIndex !== 0 ? 'value-cell' : '')}
                >
                    {columnIndex === 0 && rowIndex === 0 ? 
                    null
                    : 
                    <input
                    type="text"
                    value={cell}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleCellValueChange(rowIndex, columnIndex, event.target.value)}
                />}
                    
                </td>
            ))}
            {rowIndex === 0 ?
                <td className='borderless'>
                    <Button className='button add-button' variant='link' onClick={handleAddColumn}/>
                </td>
                :
                <td className='borderless'>
                    <Button className='button remove-button' variant='link' onClick={handleRemoveRow}/>
                </td>       
            }           
        </tr>
    )};

export default AnalyserTableRow;