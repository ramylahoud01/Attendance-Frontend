import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function StyledDropDown({ onChange, name, backgroundColor, height, dialog, emptyRole, updateRoleValue, disabled }) {
    const [selectedValue, setSelectedValue] = useState("");

    const RoleValues = [
        { value: "Admin" },
        { value: "Manager" },
        { value: "Staff" }
    ];

    const changeHandler = (event) => {
        if (updateRoleValue) {
            updateRoleValue(event.target.value);
        }
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
    };
    useEffect(() => {
        if (emptyRole === true) {
            setSelectedValue("")
        }
    }, [emptyRole])

    return (
        <FormControl sx={{ margin: 0, padding: 0 }} size="small">
            {selectedValue === "" && <InputLabel shrink={false} id="demo-simple-select-label">{name}</InputLabel>}
            <Select
                labelId="demo-simple-select-label"
                value={selectedValue}
                sx={{ height: { height }, backgroundColor: { backgroundColor }, m: 0, p: 0, width: !dialog ? { xs: '25ch', md: '35ch' } : { sm: '222.4px', xs: '100%' } }}
                onChange={changeHandler}
                disabled={disabled}
            >
                {RoleValues.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    );
}

export default StyledDropDown;
