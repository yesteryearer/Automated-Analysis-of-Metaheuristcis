import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

type MinimiserButtonProps = {
    isOpen: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const MinimiserButton: FunctionComponent<MinimiserButtonProps> = ({
    isOpen,
    setState,
}) => (
    <Button
        onClick={() => setState(!isOpen)}
        className={`button ${isOpen ? 'remove' : 'add'}-button`}
        variant='link'
        style={{ boxShadow: 'none' }}
    />
);

export default MinimiserButton;
