import { Typography } from '@mui/material'
import React from 'react'

function StyleFormContainer({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', paddingBottom: '40px' }}>
            <Typography component={'div'}
                sx={{
                    backgroundColor: 'white',
                    width: 'auto',
                    borderRadius: '10px',
                    justifyContent: "center",
                    boxShadow: '0 4px 8px rgba(170,170,170, 0.5)',
                    padding: '0px 20px'
                }}>
                {children}
            </Typography>
        </div >
    )
}

export default StyleFormContainer