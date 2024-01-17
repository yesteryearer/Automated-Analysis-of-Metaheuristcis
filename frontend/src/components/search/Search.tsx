import React, { FunctionComponent } from 'react';
import './Search.css';
import SearchBar from './SearchBar';
import SearchResultsTable from './SearchResultsTable';
import SearchProvider from '../../contexts/SearchProvider';
import { SearchContext } from '../../contexts/SearchContext';
import withContext from '../logger/LoggerWithContext';
import SearchMarkdown from './SearchMarkdown';

const Search: FunctionComponent = () => {
  const SearchLogger = withContext(SearchContext);

  return (
      <SearchProvider>
          <div className='main-content'>
            <div className='search-container'>
              <h1>Search</h1>
              <SearchBar/>
              <div className='results-logger-container'>
                <SearchResultsTable />
              </div>
              <SearchMarkdown/>
            </div>
            <div className='dashboard'>
              <SearchLogger />
            </div>
          </div>
      </SearchProvider>
  );
}

export default Search;
