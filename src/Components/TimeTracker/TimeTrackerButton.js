import { Button } from '@mui/material'
import React from 'react'

function TimeTrackerButton({ title, color, onClick }) {
    const clickHandler = (event) => {
        onClick(true)
    }
    return (
        <Button variant='contained' color={color} sx={{ color: 'white' }} onClick={clickHandler}>
            {title}
        </Button>
    )
}

export default TimeTrackerButton