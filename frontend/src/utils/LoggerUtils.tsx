import { Log, LogClass } from "../types";

export const createLog = (setLogs: React.Dispatch<React.SetStateAction<Log[]>>, message: string, logClass: LogClass) => {
    setLogs((logs) => {
        let newId = logs.length > 0 ? logs[logs.length - 1].id + 1 : 0;

        const timestamp = new Date().toLocaleTimeString();
        
        const ids = new Set(logs.map(log => log.id));

        while (ids.has(newId)) {
            newId++;
        }

        return [
            ...logs,
            {
                id: newId,
                message,
                class: logClass,
                timestamp: timestamp,
            },
        ];
    });
};
