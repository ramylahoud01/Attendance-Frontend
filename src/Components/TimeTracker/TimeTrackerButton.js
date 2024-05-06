import { Button } from '@mui/material'
import React from 'react'

function TimeTrackerButton({ title, color, onClick }) {
    const clickHandler = (event) => {
        onClick(true)
    }
    return (
        <Button variant='contained' color='secondary' sx={{ color: 'white', fontSize: '19px', fontWeight: 'bold' }} onClick={clickHandler} size='large'>
            {title}
        </Button>
    )
}

export default TimeTrackerButton