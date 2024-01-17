import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';
import ControlResult from './ControlResult';
import PairwiseResult from './PairwiseResult';
import AllResult from './AllResult';
import ResultProvider from '../../contexts/ResultProvider';
import { ResultContext } from '../../contexts/ResultContext'; 
import withContext from '../logger/LoggerWithContext';
import ResultControlPanel from './ResultControlPanel';
import AnalysisPane from '../analysis-pane/AnalysisPane';

const ResultsPage: FunctionComponent = () => {
  const ResultLogger = withContext(ResultContext);
  const location = useLocation();

  const analysisResult = location.state?.data;
  const analysisName = location.state?.analysisName;
  const analysisType = analysisResult.analysisType;

  const renderComponent = () => {
    switch (analysisType) {
        case 'pairwise':
            return <PairwiseResult analysisResult={analysisResult} />;
        case 'control':
            return <ControlResult analysisResult={analysisResult} />;
        case 'all':
            return <AllResult analysisResult={analysisResult} />;
        default:
            return <></>;
    }
  };

  return (
    <ResultProvider>
      <div className='main-content'>
        <div className='result-container'>
            <h1>Analysis</h1>
            {renderComponent()}
        </div>
        <div className='dashboard'>
          <AnalysisPane analysisResult={analysisResult} name={analysisName} />
          <ResultControlPanel />
          <ResultLogger />
        </div>
      </div>
    </ResultProvider>
  );
}

export default ResultsPage;



