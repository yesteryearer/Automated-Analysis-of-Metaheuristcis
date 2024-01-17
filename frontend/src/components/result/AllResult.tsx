import React from 'react';
import StandardFriedmanMarkdown from './StandardFriedmanMarkdown';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ExpandableMarkdown from '../general/ExpandableMarkdown';
import HypothesisMarkdown from './HypothesisMarkdown';
import CDPlotsMarkdown from './CDPlotsMarkdown';

interface AllResultProps {
    analysisResult: any;
}

const AllResult: React.FC<AllResultProps> = ({ analysisResult }) => {
    const analysisData = analysisResult.analysisData || [];
    const description = analysisResult.description || 'No description available';
    const cdPlotData = analysisResult.cdPlotData || [];

    const mainContent = `
### All versus All Analysis (NvN) ###

A all versus all analysis was conducted between all of the algorithms, using the \`Friedman Test\` with the \`Iman-Davenport correction\`, followed by seperate \`Holm and Neyemi post-hoc procedures\` to determine the significance of differences between algorithms.
`;

    const theoryContent = `
The null hypothesis for the Friedman test posits that there is no significant difference in median performance across all algorithms:
$$
H_0: \\theta_1 = \\theta_2 = \\ldots = \\theta_k
$$
where $\\theta_j$ represents the median performance of the $j^{th}$ algorithm.

The alternative hypothesis suggests a significant difference in median performance for at least one algorithm:
$$
H_1: \\theta_j \\neq \\theta_l
$$
for some pair of algorithms $\{j, l}$.
`;

    return (
        <div className='all-container'>
            <MarkdownDisplay content={mainContent} />
            <ExpandableMarkdown previewContent="" fullContent={theoryContent} />
            <StandardFriedmanMarkdown analysisResult={analysisResult} />
            <HypothesisMarkdown
                analysisData={analysisData}
                analysisResult={analysisResult}
                comparisons={[
                    { postHocTestName: "Holm", significantAlgorithms: description.significant_algorithms_holm },
                    { postHocTestName: "Nemenyi", significantAlgorithms: description.significant_algorithms_nemenyi }
                ]}
            />
            {cdPlotData && (
                <CDPlotsMarkdown cdPlotData={cdPlotData} />
            )}
        </div>
    );
}

export default AllResult;
