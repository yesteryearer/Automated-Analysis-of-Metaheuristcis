import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import Table from 'react-bootstrap/Table';
import './SearchResultsTable.css';
import { LogClass } from '../../types';
import ExploreResultButton from '../buttons/ExploreResultButton';

const SearchResultsTable: FunctionComponent = () => {
  const { results, createLog } = useContext(SearchContext);
  const prevResultsRef = useRef(results);

  useEffect(() => {
    if (prevResultsRef.current.length > 0 && results.length === 0) {
      createLog('No search results to display.', LogClass.INFO);
    }

    prevResultsRef.current = results;
  }, [results, createLog]);

  if (results.length === 0) {
    return null;
  }

  return (
    <div className='results-table'>
      <Table>
        <thead>
          <tr>
            <th className='title-cell'>ID</th>
            <th className='title-cell'>Name</th>
            <th className='title-cell'>Type</th>
            <th className='borderless'></th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td className='value-cell'>{result.id}</td>
              <td className='value-cell'>{result.name}</td>
              <td className='value-cell'>{result.type}</td>
              <td className='borderless'>
                  <ExploreResultButton id={result.id} type={result.type} data={result.data} item_name={result.name}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SearchResultsTable;

