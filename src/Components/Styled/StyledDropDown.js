import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function StyledDropDown({ onChange, name }) {
    const [selectedValue, setSelectedValue] = useState("");

    const RoleValues = [
        { value: "Admin" },
        { value: "Manager" },
        { value: "Staff" }
    ];

    const changeHandler = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <FormControl sx={{ margin: 0, padding: 0 }} size="small">
            {selectedValue === "" && <InputLabel shrink={false} id="demo-simple-select-label">{name}</InputLabel>}
            <Select
                labelId="demo-simple-select-label"
                value={selectedValue}
                sx={{ height: '45px', backgroundColor: '#F5F5F5', m: 0, p: 0, width: { xs: '25ch', md: '30ch' } }}
                onChange={changeHandler}
            >
                {RoleValues.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default StyledDropDown;
