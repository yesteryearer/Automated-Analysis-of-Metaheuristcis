import React from 'react';
import { LogContextType } from "../../types";
import Logger from './Logger';

const withContext = <T extends LogContextType>(Context: React.Context<T>) => {
    return () => {
        return (
            <Context.Consumer>
                {value => <Logger logs={value.logs} setLogs={value.setLogs} />}
            </Context.Consumer>
        );
    }
}

export default withContext;


