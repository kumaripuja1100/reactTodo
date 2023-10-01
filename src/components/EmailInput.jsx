import React from 'react';
import { TextField } from '@material-ui/core';

const EmailInput = ({value, onChange,showError,messageText}) => {

    return (
        <div>
            <TextField label="Email"  error={showError} helperText={messageText} variant='outlined' fullWidth value={value} onChange={onChange}
                margin="normal" />
        </div>
    );
}
export default EmailInput;