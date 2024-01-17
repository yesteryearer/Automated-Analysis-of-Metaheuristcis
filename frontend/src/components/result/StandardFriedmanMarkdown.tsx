import React from 'react';
import RankMarkdown from './RankMarkdown';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ExpandableMarkdown from '../general/ExpandableMarkdown';

interface StandardFriedmanMarkdownProps {
    analysisResult: any;
}

const StandardFriedmanMarkdown: React.FC<StandardFriedmanMarkdownProps> = ({ analysisResult }) => {
    const ranksData = analysisResult.ranksTable || [];
    const description = analysisResult.description || 'No description available';

    const initialContent = `
#### **Test Parameters** ####
\`\`\`
- Test Applied: Friedman Test with Iman-Davenport Correction
- Alpha (Significance Level): ${description.alpha}
- Number of Algorithms: ${description.algorithm_cardinality}
- Number of Benchmark Functions: ${description.benchmark_cardinality}
- Optimization Mode: ${description.optimization_mode}
\`\`\`

---

#### **Results Overview** ####

${description.hypothesis_test_result}

\`\`\`
- Significance: ${description.significant}
- Null Hypothesis: ${description.significant ? 'rejected' : 'retained'}
- p-value: ${description.p_value}
- Friedman Test Statistic: ${description.friedman_stat}
- Iman-Davenport Statistic: ${description.iman_davenport_stat}
- Iman-Davenport Critical Value: ${description.iman_davenport_critical}
- Significant Algorithms: ${description.significant_algorithms.join(', ')}
\`\`\`

---
### **Significance Analysis** ###

#### Standard Friedman Test ####

The purpose of the \`Friedman Test\` is to determine whether there are significant differences in the performance of the algorithms. If the null hypothesis is rejected, the \`Holm post-hoc procedure\` is used to determine which algorithms are significantly different from each other.
The \`Iman-Daveport\` extension is applied to the Friedman Test to address the issue of overly conservative behaviour.
`;

    const expandableContent = `
Compute the Friedman statistic $\\chi^2_F$ as

$$
    \\chi^2_F =\\frac{12n}{k(k+1)}\\left[ \\sum_j R_j^2 - \\frac{k(k+1)^2}{4}\\right]
$$

The Friedman Test Statistic ($\\chi^2_F = ${description.friedman_stat}$) is used to derive the p-value ($p = ${description.p_value}$) for the test.

The p-value ($p = ${description.p_value}$) is compared against the predefined alpha level ($\\alpha = ${description.alpha}$):

- If $p < \\alpha$, it indicates a rejection of the null hypothesis, suggesting significant differences among the algorithms.
- If $p \\geq \\alpha$, it implies insufficient evidence to reject the null hypothesis, indicating no significant differences.

#### **Conclusion** ####

The null hypothesis is ${description.significant ? 'rejected' : 'retained'}, as $p = ${description.p_value} ${description.significant ? '<' : '\\geq'} \\alpha = ${description.alpha}$.

---

\`\`\` 
Note:
The reliability of the p-value, as determined by the Friedman Test, 
depends on the assumption that the test statistic follows a chi-squared distribution.
This assumption holds more accurately when there are more than 10 benchmark functions 
(${description.benchmark_cardinality > 10 ? "which is the case in this analysis" : "which is not the case in this analysis"}) and more than 6 repeated samples.
\`\`\`

---

#### Iman-Davenport Correction ####

To address the above issue, the \`Iman-Davenport correction\` is applied to the Friedman Test. The Iman-Davenport Statistic ($F_F = ${description.iman_davenport_stat}$) is used to derive the critical value ($c = ${description.iman_davenport_critical}$) for the test.

Iman and Davenport showed that the Friedman test presents overly conservative behaviour and proposed a better statistic:

$$
    F_F = \\frac{(n-1)\\chi^2_F}{n(k-1)-\\chi^2_F}
$$

which is distributed in accordance with the F-distribution with $${description.algorithm_cardinality}-1$ and $(${description.algorithm_cardinality}-1)(${description.benchmark_cardinality}-1)$ degrees of freedom.
If $F_F > c$, the null hypothesis is rejected, an indication of statistically significant differences in the performance of the set of algorithms. If $F_F \\leq c$, the null hypothesis is not rejected, and the test is insignificant, an indication that no statistically significant difference in the performance of the algorithms exists.    
`;

    const finalContent = `

#### **Conclusion** ####

${description.iman_davenport_stat > description.iman_davenport_critical ? 
    `As the Iman Davenport statistic ($F_F = ${description.iman_davenport_stat} > c = ${description.iman_davenport_critical}$), the null hypothesis is rejected. An indication of statistically significant differences in the performance of the algorithms.` : 
    `Since the Friedman statistic ($F_F = ${description.iman_davenport_stat$}) \\leq c = ${description.iman_davenport_critical}$), the null hypothesis is not rejected, indicating no significant difference in the performance of the algorithms.`}

`;

    return (
        <>
            <MarkdownDisplay content={initialContent} />
            <ExpandableMarkdown previewContent="" fullContent={expandableContent} />
            <RankMarkdown ranksData={ranksData} />
            <MarkdownDisplay content={finalContent} />
        </>
    );
}

export default StandardFriedmanMarkdown;