import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

type ExtractDataButtonProps = {
  extractTableData: () => Array<{ [key: string]: string }>;
};

const ExtractDataButton: FunctionComponent<ExtractDataButtonProps> = ({
    extractTableData,
}) => {
  	const handleClick = () => {
		const extractedData = extractTableData();
		console.log(extractedData);
	};

  return <Button onClick={handleClick}>Extract Data</Button>;
};

export default ExtractDataButton;