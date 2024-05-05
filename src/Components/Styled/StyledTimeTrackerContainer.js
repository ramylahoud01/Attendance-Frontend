import React from 'react'
import { Typography } from "@mui/material"

function StyledTimeTrackerContainer({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '100px', paddingTop: '100px' }}>
            <Typography component={'div'} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '10px', width: '1000px' }}>
                {children}
            </Typography>
        </div >
    )
}

export default StyledTimeTrackerContainer