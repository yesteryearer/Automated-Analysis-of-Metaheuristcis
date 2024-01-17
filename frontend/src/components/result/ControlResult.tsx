import React from 'react';
import StandardFriedmanMarkdown from './StandardFriedmanMarkdown';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ExpandableMarkdown from '../general/ExpandableMarkdown';
import HypothesisMarkdown from './HypothesisMarkdown';
import CDPlotsMarkdown from './CDPlotsMarkdown';

interface ControlResultProps {
    analysisResult: any;
}

const ControlResult: React.FC<ControlResultProps> = ({ analysisResult }) => {
    const analysisData = analysisResult.analysisData || [];
    const description = analysisResult.description || 'No description available';
    const cdPlotData = analysisResult.cdPlotData || [];

    const initialContent = `
### Control Analysis (1vN): ${description.control_algorithm}

A one versus all analysis was conducted between the control algorithm \`${description.control_algorithm}\` and all other algorithms, using the \`Friedman Test\` with the \`Iman-Davenport correction\`, followed by the \`Holm post-hoc procedure\` to determine the significance of differences between algorithms.
`;

    const expandableContent = `
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
        <div className='control-container'>
            <MarkdownDisplay content={initialContent} />
            <ExpandableMarkdown previewContent="" fullContent={expandableContent} />
            <StandardFriedmanMarkdown analysisResult={analysisResult} />
            <HypothesisMarkdown
                analysisData={analysisData}
                analysisResult={analysisResult}
                comparisons={[
                    { postHocTestName: "Holm", significantAlgorithms: description.significant_algorithms },
                ]}
            />

            {cdPlotData && (
                <CDPlotsMarkdown cdPlotData={cdPlotData} />
            )}
        </div>
    );
}

export default ControlResult;
