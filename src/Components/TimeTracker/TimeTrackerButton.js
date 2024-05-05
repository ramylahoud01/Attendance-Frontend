import { Button } from '@mui/material'
import React from 'react'

function TimeTrackerButton({ title, color, onClick }) {
    const clickHandler = (event) => {
        onClick(true)
    }
    return (
        <Button variant='contained' sx={{ backgroundColor: '#A9A9A9', color: 'white' }} color='tertiary' onClick={clickHandler} size='large'>
            {title}
        </Button>
    )
}

export default TimeTrackerButton