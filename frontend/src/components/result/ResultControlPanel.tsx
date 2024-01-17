import React, { FunctionComponent, useState } from 'react';
import MinimiserButton from '../buttons/MinimiserButton';
import CommitResultButton from '../buttons/CommitResultButton';
import './ResultControlPanel.css';

const AnalyserControlPanel: FunctionComponent = () => {

    const [isPanelOpen, setIsPanelOpen] = useState(true);

    return (
        <div className={`control-panel-container ${isPanelOpen ? 'open' : 'close'}`}>
            <div className='mount'>
                <h2>Control Panel</h2>
                <MinimiserButton isOpen={isPanelOpen} setState={setIsPanelOpen} />
            </div>

            {isPanelOpen && (
            <div className='panel-grid'> 
                <CommitResultButton/>
            </div>
            
            )}
        </div>
    );
};

export default AnalyserControlPanel;