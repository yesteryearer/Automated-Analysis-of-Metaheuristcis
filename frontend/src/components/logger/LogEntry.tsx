import React, { FC } from 'react';
import { Log, LogClass } from '../../types';
import { Button } from 'react-bootstrap';

type LogEntryProps = {
	log: Log;
	deleteLog: (id: number) => void;
};

const LogEntry: FC<LogEntryProps> = ({
    log,
    deleteLog
}) => {
	let prefixClass = '';

	switch (log.class) {
		case LogClass.INFO:
			prefixClass = 'info';
			break;
		case LogClass.WARNING:
			prefixClass = 'warning';
			break;
		case LogClass.ERROR:
			prefixClass = 'error';
			break;
		case LogClass.SUCCESS:
			prefixClass = 'success';
			break;
		default:
			prefixClass = 'unknown';
			break;
  }

  return (
    <div key={log.id} className='log-item'>
        <p>
            <span className={prefixClass}>{log.class.toUpperCase() + ':'}</span> [{log.timestamp}] {log.message}
        </p>
        <Button 
			className='button remove-button'
            onClick={() => deleteLog(log.id)}
        />
    </div>
  );
};

export default LogEntry;