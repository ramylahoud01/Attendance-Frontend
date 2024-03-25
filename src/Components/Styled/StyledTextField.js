import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

function StyledTextField({ placeholder, type, onChange, name, endAdornment }) {
    const changeHandler = (event) => {
        onChange(event.target.value)
    }
    return (
        <TextField
            sx={{ backgroundColor: '#F5F5F5', width: { xs: '25ch', md: '30ch' } }}
            placeholder={placeholder}
            type={type}
            inputProps={{
                style: { height: '12px' },
                min: 0
            }}
            InputLabelProps={{
                shrink: true,
                style: { fontWeight: 600, fontSize: '17px', color: 'gray' }
            }}
            color='primary'
            onChange={changeHandler}
            name={name}
            InputProps={{
                endAdornment: (
                    endAdornment &&
                    <InputAdornment position="start" sx={{ ml: '5px' }} >
                        {endAdornment}
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default StyledTextField
