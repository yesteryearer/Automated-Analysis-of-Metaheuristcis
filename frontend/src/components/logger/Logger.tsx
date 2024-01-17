import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import { LogContextType } from "../../types";
import LogEntry from "./LogEntry";
import MinimiserButton from "../buttons/MinimiserButton";
import './Logger.css';
import { Button } from "react-bootstrap";

const Logger: FunctionComponent<LogContextType> = ({    
    setLogs,
    logs
}) => {
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const logStreamRef = useRef<HTMLDivElement>(null);

    const deleteLog = (id: number) => {
        setLogs(logs.filter((log) => log.id !== id));
    };

    useEffect(() => {
        if (logStreamRef.current) {
            logStreamRef.current.scrollTo(0, logStreamRef.current.scrollHeight);
        }
    }, [logs]);

    return (
        <div className={`logger-container ${isPanelOpen ? 'open' : 'close'}`}>
            <div className='mount'>
                <h2>Log</h2>
                <MinimiserButton isOpen={isPanelOpen} setState={setIsPanelOpen} />
            </div>

            {isPanelOpen && (
				<>
					<div className='log-stream' ref={logStreamRef}> 
                        {logs.map((log) => (
                            <LogEntry
                                key={log.id}
                                log={log}
                                deleteLog={() => deleteLog(log.id)}
                            />
                        ))}
                    </div>

					<Button 
					    onClick={() => setLogs([])}
					    className='clear-button'>
						Clear
					</Button>
				</>
            )}
        </div>
      );
};

export default Logger;
