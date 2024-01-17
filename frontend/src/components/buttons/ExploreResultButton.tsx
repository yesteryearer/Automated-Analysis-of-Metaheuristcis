import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contexts/SearchContext';
import { LogClass } from '../../types';
import { ResultType } from '../../types'

interface ExploreResultButtonProps {
    id: number;
    type: string;
    data: any;
    item_name: string;
}

const ExploreResultButton: React.FC<ExploreResultButtonProps> = ({ id, type, data, item_name }) => {
    const { createLog } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleExploreResult = () => {
        if (!data) {
            createLog(`No data available for result ID ${id}.`, LogClass.ERROR);
            return;
        }

        if (type === ResultType.ANALYSIS) {
            navigate('/results', { state: { data: data, analysisName: item_name } });
        } else if (type === ResultType.EXPERIMENT) {
            navigate('/analyser', { state: { data: data } });
        }
    }

    return (
        <Button onClick={handleExploreResult} variant="primary" className='button add-button' />
    );
};

export default ExploreResultButton;
