import { InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";

function StyledSearchQuery({ retreiveQuery, }) {
    const [searchQuery, setSearchQuery] = useState("")
    const changeQueryHandler = (event) => {
        setSearchQuery(event.target.value)
        retreiveQuery(event.target.value)
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: 'center'
            }}
        >
            <TextField
                value={searchQuery}
                onChange={changeQueryHandler}
                variant="outlined"
                sx={{
                    backgroundColor: 'linear-gradient(120deg, #fdfbfb 0%, #f3f5f6 100%)',
                    width: "280px",
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        backgroundColor: 'white	'
                    },
                }}
                size="small"
                label={<Typography variant='span' component={'span'} fontWeight={550}>Search for Employees</Typography>}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}

export default StyledSearchQuery