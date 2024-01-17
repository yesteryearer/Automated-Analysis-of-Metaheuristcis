import React from 'react';
import MarkdownDisplay from '../general/MarkdownDisplay';
import ExpandableMarkdown from '../general/ExpandableMarkdown';
import CriticalDifferencePlot from '../plots/CriticalDifferencePlot';

interface CDPlotData {
    imageData: string;
    title: string;
}

interface CDPlotsMarkdownProps {
    cdPlotData: CDPlotData[];
}

const CDPlotsMarkdown: React.FC<CDPlotsMarkdownProps> = ({ cdPlotData }) => {
    const mainContent = `
#### **Critical Difference Plots** ####

Critical Difference (CD) diagrams are an insightful way to compare the performances of multiple methods or treatments across various observations. In machine learning, for instance, these diagrams are often used to compare the effectiveness of different algorithms across multiple datasets.
`;

    const theoryContent = `
### How to Read a CD Diagram
    
- **Position of Algorithms**: In a CD diagram, each algorithm is plotted based on its average rank across all outcomes. A lower rank indicates better performance. For example, if an algorithm is consistently outperforming others across various datasets, it will appear closer to the left side of the diagram.

- **Connecting Lines**: Algorithms are connected with a horizontal line if their performances are not statistically significantly different.

- **Statistical Significance**: The plot is based on hypothesis testing. Initially, a Friedman test determines if there are significant differences in performances at all. If this test fails, it implies that the treatments are statistically indistinguishable. If it passes, we proceed with post-hoc analysis (like Nemenyi or Holm) to understand the specific differences.

### Interpreting the Diagram

- **Disconnected Treatments**: If two treatments are not connected by a line, it indicates a statistically significant difference in their performance.

- **Groups of Treatments**: A group of connected treatments implies that they have similar performances. As a user, you might consider them equally effective for your specific needs.

The CD diagram is a powerful tool for visually summarizing complex statistical comparisons. It helps in quickly identifying which treatments are similar or different in performance, guiding your decision-making in choosing the right method for your application.
`;

    return (
        <div>
            <MarkdownDisplay content={mainContent} />
            <ExpandableMarkdown previewContent="" fullContent={theoryContent} />
            {cdPlotData.map(plot => (
                <CriticalDifferencePlot 
                    imageData={plot.imageData} 
                    title={plot.title} 
                    key={plot.title}
                />
            ))}
        </div>
    );
}

export default CDPlotsMarkdown;