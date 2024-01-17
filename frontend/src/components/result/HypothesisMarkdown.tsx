import React from 'react';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ResultTable from './ResultTable';

interface Comparison {
    postHocTestName: string;
    significantAlgorithms: string[];
}

interface HypothesisMarkdownProps {
    analysisData: any[];
    analysisResult: any;
    comparisons: Comparison[];
}

const HypothesisMarkdown: React.FC<HypothesisMarkdownProps> = ({ analysisData, analysisResult, comparisons }) => {

    const generateComparisonsMarkdown = (comparisons: Comparison[]) => {
        return comparisons.map(({ postHocTestName, significantAlgorithms }) => {
            const comparisonList = significantAlgorithms.length > 0
                ? significantAlgorithms.map(alg => `- ${alg}`).join('\n')
                : `No significant comparisons were found using the ${postHocTestName} test.`;
            
            return `**${postHocTestName}**\n\n${comparisonList}\n`;
        }).join('\n');
    }

    const hypothesisContent = `
### Hypothesis Testing Overview

This section provides an overview of the hypothesis testing conducted. The primary objective of hypothesis testing in this context is to determine whether there are statistically significant differences in the performance of various algorithms. The Friedman Control Test is one such method used for this purpose.

Below is a table summarizing the results of the Friedman Control Test. This table presents a comprehensive view of the performance rankings and statistical measurements that help in evaluating the effectiveness of different algorithms under comparison.

A green cell indicates that the null hypothesis is retained, a red cell indicates that the null hypothesis is rejected, an indication of a significant difference.

#### Significant Comparisons

${generateComparisonsMarkdown(comparisons)}
`;

    return (
        <div>
            <MarkdownDisplay content={hypothesisContent} />
            <ResultTable analysisData={analysisData} title='Friedman Control Test' />
        </div>
    );
}

export default HypothesisMarkdown;


