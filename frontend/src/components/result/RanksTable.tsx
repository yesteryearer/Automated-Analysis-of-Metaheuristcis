import React from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';
import LatexTableButton from '../buttons/LatexTableButton';
import DLCSVButton from '../buttons/DownloadCSVButton';
import { ResultContext } from '../../contexts/ResultContext';

interface RanksTableProps {
    title: string;
    ranksData: string[][];
}

const RanksTable: React.FC<RanksTableProps> = ({ ranksData, title }) => {
    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className='borderless'>Name</th>
                    <th className='title-cell'>Mean Rank</th>
                    <th className='title-cell'>Ultimate Rank</th>
                </tr>
            </thead>
            <tbody>
                {ranksData.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td className={j===0 ? 'title-cell':'value-cell'} key={j}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
        <div className="button-container">
            <LatexTableButton table={ranksData} title={title} />
            <DLCSVButton context={ResultContext} table={ranksData} title={title} />
        </div>
        </>
    );
}

export default RanksTable;
