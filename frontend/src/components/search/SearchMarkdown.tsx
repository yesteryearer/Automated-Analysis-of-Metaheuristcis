import React, { FunctionComponent } from 'react';
import ExpandableMarkdown from '../general/ExpandableMarkdown';

const SearchMarkdown: FunctionComponent = () => {
  const previewContent = `
\`\`\`
The search feature allows you to search for analyses and experiments by name or ID.
\`\`\`
`;
  const fullContent = `
\`\`\`
The Search Bar allows you to quickly find results in three categories: All, Experiments, and Analyses. 

- \`Default\`: To search across **all** categories, simply enter your query.
- \`[all]\`: To return all entries in the database, use \`[all]\` at the start of your query.
- \`[exp]\`: To search within **Experiments**, prefix your query with \`[exp]\`.
- \`[als]\`: To search within **Analyses**, prefix your query with \`[als]\`.

\`\`\`
`;

  return (
    <ExpandableMarkdown previewContent={previewContent} fullContent={fullContent} />
  );
}

export default SearchMarkdown;

