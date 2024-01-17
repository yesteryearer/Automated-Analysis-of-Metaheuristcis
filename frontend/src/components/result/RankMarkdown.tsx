import React from 'react';
import RanksTable from './RanksTable';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ExpandableMarkdown from '../general/ExpandableMarkdown';

interface RankMarkdownProps {
    ranksData: string[][];
}

const RankMarkdown: React.FC<RankMarkdownProps> = ({ ranksData }) => {
    const initialContent = `
#### **Algorithm Ranks** ####
The crucial first step of the Friedman Test is to rank the algorithms based on performance across all benchmark functions.
`;

    const expandableContent = `
For each benchmark problem $i$, rank the performance of the algorithms from $1$ (best result) to $k$ (worst result). Denote these ranks as $r_i^j$ for each algorithm $j$ such that $1 \\leq j \\leq k$, average ranks are assigned in the case of ties.
For each algorithm $j$, average the ranks obtained in all problems to obtain the final rank $R_j = \\frac{1}{n} \\sum_i r_i^j$, where $n$ represents the cardinality of the benchmark suite, *i.e.*, the total number of benchmark problems.

`;

    const finalContent = `
The table below provides an overview of the ranks for each algorithm:
`;

    return (
        <>
            <MarkdownDisplay content={initialContent} />
            <ExpandableMarkdown previewContent="" fullContent={expandableContent} />
            <MarkdownDisplay content={finalContent} />
            <RanksTable title='Algorithm Ranks' ranksData={ranksData} />
        </>
    );
}

export default RankMarkdown;