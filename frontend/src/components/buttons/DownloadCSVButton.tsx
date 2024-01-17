import React, { Context } from 'react';
import withContext from './DownloadCSVButtonWithContext';

type DownloadCSVButtonProps = {
    context: Context<any>;
    table: string[][];
    title: string;
};

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ context, table, title }) => {
    const ContextualDownloadButton = withContext(context, table, title);
    return <ContextualDownloadButton />;
};

export default DownloadCSVButton;