import { Typography } from '@mui/material'
import React from 'react'

function MapEmployeeHeader({ title }) {
    return <Typography style={{ textAlign: 'start', fontWeight: 550, color: '#2F4F4F', margin: '20px 0px', }} variant='h6'>{title}</Typography>
}

export default MapEmployeeHeader