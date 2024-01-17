import React, { Dispatch, SetStateAction } from 'react';
import { Log, LogClass, Result} from '../types';

export const SearchContext = React.createContext({
    logs: [] as Log[],
    setLogs: (() => {}) as Dispatch<SetStateAction<Log[]>>,
    createLog: (() => {}) as (message: string, logClass: LogClass) => void,
    results: [] as Result[],
    setResults: (() => {}) as Dispatch<SetStateAction<Result[]>>,
});