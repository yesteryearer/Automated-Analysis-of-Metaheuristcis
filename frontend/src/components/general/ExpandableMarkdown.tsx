import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './MarkdownDisplay.css';

interface ExpandableMarkdownProps {
    previewContent: string;
    fullContent: string;
}

const ExpandableMarkdown: React.FC<ExpandableMarkdownProps> = ({ previewContent, fullContent }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <ReactMarkdown
                children={isExpanded ? fullContent : previewContent}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            />
            <div className="button-container">
                <button onClick={toggleExpand}>
                    {isExpanded ? 'Less' : 'More'}
                </button>
            </div>

        </div>
    );
};

export default ExpandableMarkdown;
