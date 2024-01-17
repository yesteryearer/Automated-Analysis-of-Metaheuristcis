import { Dispatch, SetStateAction } from 'react';

export enum LogClass {
    WARNING = "warning",
    ERROR = "error",
    INFO = "info",
    SUCCESS = "success"
};
  
export type Log = {
    id: number;
    message: string;
    class: LogClass;
    timestamp: string;
};

export type LogContextType = {
    logs: Log[];
    setLogs: Dispatch<SetStateAction<Log[]>>;
};
