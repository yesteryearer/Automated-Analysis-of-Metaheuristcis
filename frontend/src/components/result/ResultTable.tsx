import React from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';
import LatexTableButton from '../buttons/LatexTableButton';
import { ResultContext } from '../../contexts/ResultContext'; 
import DLCSVButton from '../buttons/DownloadCSVButton';
import getClassName from '../../utils/tables/HypothesisCellColour';

interface ResultTableProps {
    title: string;
    analysisData: string[][];
}

const ResultTable: React.FC<ResultTableProps> = ({ analysisData, title }) => {

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {analysisData[0]?.map((title, index) => (
                            <th className={index === 0 ? 'borderless' : 'title-cell'} key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {analysisData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className={getClassName(cell, cellIndex)} key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="button-container">
                <LatexTableButton table={analysisData} title={title} />
                <DLCSVButton context={ResultContext} table={analysisData} title={title} />
            </div>
            
        </>
    );
}

export default ResultTable;