import { Typography } from '@mui/material'
import React from 'react'

function StyledTimeTrackerContainer({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', paddingBottom: '40px' }}>
            <Typography component={'div'}
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    borderRadius: '10px',
                    justifyContent: "center",
                    boxShadow: '0 4px 8px rgba(170,170,170, 0.5)',
                    padding: '20px 20px',
                }}>
                {children}
            </Typography>
        </div >
    )
}

export default StyledTimeTrackerContainer