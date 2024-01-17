import React from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';
import LatexTableButton from '../buttons/LatexTableButton';
import DLCSVButton from '../buttons/DownloadCSVButton';
import { ResultContext } from '../../contexts/ResultContext'; 
import getClassName from '../../utils/tables/HypothesisCellColour';

interface WilcoxonCriticalTableProps {
    title: string;
    analysisData: string[][];
}

const WilcoxonCriticalTable: React.FC<WilcoxonCriticalTableProps> = ({ analysisData, title }) => {
    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    {analysisData[0]?.map((title, index) => (
                        <th className='title-cell' key={index}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {analysisData.slice(1).map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td className={getClassName(cell, j)} key={j}>{cell}</td>
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

export default WilcoxonCriticalTable;