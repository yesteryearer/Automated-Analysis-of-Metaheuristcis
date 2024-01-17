import React from 'react';
import DownloadImageButton from '../buttons/DownloadImageButton';

interface CriticalDifferencePlotProps {
    imageData: string;
    title: string;
}

const CriticalDifferencePlot: React.FC<CriticalDifferencePlotProps> = ({ imageData, title }) => {
    if (!imageData) return null;

    return (
        <div className="cd-diagram">
            <h2>{title}</h2>
            <img src={`data:image/png;base64,${imageData}`} alt={title} />
            <div className="button-container">
                <DownloadImageButton imageData={imageData} filename={title + '.png'} />
            </div>

        </div>
    );
}

export default CriticalDifferencePlot;
