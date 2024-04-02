import { Typography } from '@mui/material';
import React from 'react';

function LoginError({ errorMessage }) {
    return (
        <div style={{ marginTop: '10px' }}>
            {errorMessage &&
                errorMessage.message.split(",").map((error, index) => (
                    <Typography key={index} variant="body1" color="error" sx={{ fontSize: '13px', fontWeight: 'bold', display: 'block' }}>
                        {error.trim()}
                    </Typography>
                ))}
        </div>
    );
}

export default LoginError
