import React from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownDisplay.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownProps {
    content: string;
}

const MarkdownDisplay: React.FC<MarkdownProps> = ({ content }) => {
    return (
        <div className="markdown-display">
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            />
        </div>
    );
};

export default MarkdownDisplay;