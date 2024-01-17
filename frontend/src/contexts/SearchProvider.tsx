/**
 * Search Provider Component
 *
 * This component acts as a context provider for managing and sharing state related to search functionality within the application.
 *
 * State Management:
 * - Manages state elements such as logs and search results.
 * - Utilizes useState for local state management within the context.
 * - Provides a function 'createLog' to encapsulate log management logic, enabling easy tracking of user actions and system events.
 *
 * Props:
 * - children: Child components that will consume the context provided by SearchProvider.
 *
 * Context:
 * - Offers a centralized state management solution for components related to the search feature.
 * - Enables child components to access and manipulate shared state elements like search results and logs.
 * 
 * Usage:
 * - Wrap any component that requires access to search-related state elements with SearchProvider.
 * - Facilitates efficient state sharing and management across different components of the application related to search operations.
 *
 * Example:
 * <SearchProvider>
 *   <SearchComponent />
 * </SearchProvider>
 */

import React, { useState, useCallback } from 'react';
import { SearchContext } from './SearchContext';
import { Log, LogClass, Result } from '../types';
import { createLog as createLogFunction} from '../utils/LoggerUtils';

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [results, setResults] = useState<Result[]>([]);

    const createLog = useCallback((message: string, logClass: LogClass) => {
        createLogFunction(setLogs, message, logClass);
    }, [setLogs]);
    

    return (
        <SearchContext.Provider value={{
            logs,
            setLogs,
            createLog,
            results,
            setResults,
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;