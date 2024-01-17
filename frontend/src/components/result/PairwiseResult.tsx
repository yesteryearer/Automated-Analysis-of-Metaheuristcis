import React from 'react';
import ResultTable from './ResultTable';
import WilcoxonCriticalTable from './WilcoxonCriticalTable';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ExpandableMarkdown from '../general/ExpandableMarkdown';

interface PairwiseResultProps {
    analysisResult: any;
}

const PairwiseResult: React.FC<PairwiseResultProps> = ({ analysisResult }) => {
    const analysisData = analysisResult.analysisData || [];
    const cTable = analysisResult.cTable || [];
    const description = analysisResult.description || 'No description available';

    const initialContent = `
### Pairwise Analysis (1v1): ${description.algorithm_one} versus ${description.algorithm_two}

A pairwise analysis was conducted between the two algorithms, \`${description.algorithm_one}\` and \`${description.algorithm_two}\`, using the \`Wilcoxon Signed-rank Test\`.
`
    const theoryContentOne = `
The null hypothesis (H₀) for the Wilcoxon Signed-rank Test is that there is no significant difference between the two algorithms:
$$
H_0: \\theta_D = 0
$$
where $\\theta_D$ is the median of difference scores.

The alternative hypothesis (H₁) is:
$$
H_1: \\theta_D \\neq 0
$$
`
    const mainContentTwo = `
#### **Test Parameters** ####
\`\`\`
- Test: ${description.test_applied}
- Alpha (Significance Level): ${description.alpha}
- Number of Benchmark Functions: ${description.benchmark_cardinality}
- Optimization Mode: ${description.optimization_mode}
\`\`\`

#### **Results Overview** ####

${description.comparison_results} Let $R^+$ be the sum of ranks for problems on which the second algorithm outperformed the first and $R^-$ be the sum of ranks for the opposite.

\`\`\`
- Significance: ${description.significance}
- Null Hypothesis: ${description.significant ? 'Rejected' : 'Not Rejected'}
- p-value: ${description.p_value}
- Test Statistic (T): ${description.t}
- R⁺: ${description.r_plus}
- R⁻: ${description.r_minus}
\`\`\`

#### **Test Results Table** ####

The table below provides an overview of the test results:
---
`

    const mainContentThree =`
#### **Significance Analysis** ####

The p-value ($p = ${description.p_value}$) is compared against the predefined alpha level ($\\alpha = ${description.alpha}$). 

- If $p < \\alpha$, it indicates a rejection of the null hypothesis, suggesting a significant difference between the algorithms.
- If $p \\geq \\alpha$, it implies insufficient evidence to reject the null hypothesis, indicating no significant difference.

**Conclusion:** The null hypothesis is ${description.significant ? 'rejected' : 'retained'}, since $p = ${description.p_value} ${description.significant ? '<' : '\\geq'} \\alpha = ${description.alpha}$.

`;

    const finalContent = `

#### **Critical Values Table** ####

The table below shows critical values ($c$) obtained for various levels of significance with ${description.benchmark_cardinality} degrees of freedom from a Wilcoxon T distribution. The test statistic ($T = ${description.t}$) is compared against these critical values. If $T \\leq c$ the null hypothesis $H_0$ of equality is rejected, an indication that a given algorithm outperforms the other one. If $T > c$, then $H_0$ is not rejected, an indication that no significant difference exists between the performance of the two algorithms.
`;

    return (
        <div className='pairwise-container'>
            <MarkdownDisplay content={initialContent} />
            <ExpandableMarkdown previewContent="" fullContent={theoryContentOne} />
            <MarkdownDisplay content={mainContentTwo} />
            <ResultTable analysisData={analysisData} title='Wilcoxon Signed-rank Test' />
            <MarkdownDisplay content={mainContentThree} />
            <MarkdownDisplay content={finalContent} />
            <WilcoxonCriticalTable analysisData={cTable} title='Critical values' />
        </div>
    );
}

export default PairwiseResult;
