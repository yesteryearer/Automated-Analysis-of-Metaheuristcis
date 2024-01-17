import React from 'react';
import { Button } from 'react-bootstrap';

interface DownloadImageButtonProps {
    imageData: string;
    filename: string;
}

const DownloadImageButton: React.FC<DownloadImageButtonProps> = ({ imageData, filename }) => {
    const downloadImage = () => {
        if (!imageData) return;

        const link = document.createElement('a');
        link.href = `data:image/png;base64,${imageData}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button onClick={downloadImage} variant="primary">Download Plot</Button>
    );
}

export default DownloadImageButton;
