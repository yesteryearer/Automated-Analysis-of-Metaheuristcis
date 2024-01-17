import React, { FunctionComponent, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { SearchContext } from '../../contexts/SearchContext';
import { searchQuery } from '../../api/search/SearchApi';
import { processResults } from '../../utils/result/ProcessResults';
import { LogClass, SearchType } from '../../types';

const SearchBar: FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const { createLog, setResults } = useContext(SearchContext);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      createLog('Search query cannot be empty.', LogClass.ERROR);
      return;
    }

    let searchType = SearchType.Default;
    let searchString = trimmedQuery;
    let prefix = trimmedQuery.slice(0, 5).toLowerCase();

    switch (prefix) {
      case '[als]':
        searchType = SearchType.Analyses;
        searchString = trimmedQuery.slice(5).trim();
        break;
      case '[exp]':
        searchType = SearchType.Experiments;
        searchString = trimmedQuery.slice(5).trim();
        break;
      case '[all]':
        searchType = SearchType.All;
        searchString = trimmedQuery.slice(5).trim();
    }

    createLog(`Searching for: ${searchString} in ${searchType}`, LogClass.INFO);

    try {
      const data = await searchQuery(searchType, searchString);
      const processedResults = processResults(data);
      setResults(processedResults);
      createLog('Search completed successfully.', LogClass.SUCCESS);
    } catch (error) {
      if (error instanceof Error) {
        createLog(`Error during search: ${error.message}`, LogClass.ERROR);
      } else {
        createLog('An unknown error occurred during search.', LogClass.ERROR);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-bar'>
      <input 
        type='text' 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Enter your keywords... [all], [exp], [als]' 
      />
      <Button className='search-button' onClick={handleSearch}>Go</Button>
    </div>
  );
}

export default SearchBar;


