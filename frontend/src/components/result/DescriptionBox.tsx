import React from 'react';
import './DescriptionBox.css';

type DescriptionBoxProps = {
  description: { [key: string]: any };
};

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ description }) => {
  const descriptionItems = Object.entries(description).map(([key, value]) => {
    if (Array.isArray(value)) {
      return <p key={key}><b>{key}:</b> {value.join(', ')}</p>;
    }
    return <p key={key}><b>{key}:</b> {value}</p>;
  });

  return (
    <div className='description-box'>
      <h2>Description</h2>
      {descriptionItems}
    </div>
  );
};

export default DescriptionBox;

