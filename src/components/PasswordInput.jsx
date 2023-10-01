import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment  } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const PasswordInput= ({value, onChange,puja,errorText, showError}) => {

    const [showPassword, setShowPassword] = useState(false);

      const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
      
    return(
        <TextField
        label={puja}
        error={showError}
        helperText={errorText}
        type={ showPassword ? 'text' : 'password'}
        fullWidth
        value={value}
        onChange={onChange}
        margin="normal"
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
}

export default PasswordInput;