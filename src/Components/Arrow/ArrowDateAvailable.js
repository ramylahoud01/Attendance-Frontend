import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const DateMenu = [
    " 10AM - 7PM ",
    " 12PM - 9PM ",
    " 2PM - 11PM ",
    " 4PM - 1AM",
    " OFF ",
];

const ArrowDateAvailable = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value) => {
        setAnchorEl(null);
        props.onChangeDate(value);
    }
    return (
        <div style={{ display: 'flex' }}>
            <IconButton size='small' onClick={handleClick} sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon sx={{ '&:hover': { backgroundColor: '#D8D8D8', borderRadius: '50%' }, color: 'gray' }} />}
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                sx={{ maxHeight: '300px' }}
                anchorOrigin={{
                    vertical: 'bottom', // Position the menu below the anchor element
                    horizontal: 'center', // Center the menu horizontally relative to the anchor element
                }}
                transformOrigin={{
                    vertical: 'top', // Position the menu above the anchor element
                    horizontal: 'center', // Center the menu horizontally relative to the anchor element
                }}
            >
                {DateMenu?.map((item, index) => (
                    <MenuItem key={index} onClick={() => handleClose(item)} sx={{ width: '100px', display: 'flex', justifyContent: 'center', fontSize: '13px', }}>{item}</MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ArrowDateAvailable;
