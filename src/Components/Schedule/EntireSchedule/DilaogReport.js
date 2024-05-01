import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { displayEmployeeForAutoComplete } from '../../../Services/Employee.service'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import "./DialogReport.css"

function DilaogReport({ openDialog, handleClose }) {
    const [employees, setEmployees] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState("")
    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await displayEmployeeForAutoComplete(searchQuery)
            const data = await response.json()
            if (response.ok) {
                setEmployees(data?.employees)
            }
        }
        fetchEmployees()
    }, [searchQuery])
    const changeEmployeeHandler = (event, newValue) => {
        setSelectedEmployee(newValue)
    }
    useEffect(() => {
        const licenseKeyDiv = document.querySelector('div[style="position: absolute; pointer-events: none; color: rgba(130, 130, 130, 0.62); z-index: 100000; width: 100%; text-align: center; bottom: 50%; right: 0px; letter-spacing: 5px; font-size: 24px;"]');
        if (licenseKeyDiv) {
            licenseKeyDiv.style.display = 'none';
        }
    }, []);
    console.log('searchQuery', searchQuery)
    return (
        openDialog &&
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Please select your report filter"}
            </DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Autocomplete
                        name="Employee"
                        id="filled-select-currency"
                        options={employees || []}
                        getOptionLabel={(employee) => `${employee?.FirstName} ${employee?.LastName}`}
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        value={selectedEmployee || null}
                        onChange={changeEmployeeHandler}
                        onInputChange={(event, newInputValue) => { setSearchQuery(newInputValue) }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Employee"
                                size='small'
                                sx={{ backgroundColor: 'white' }}
                            />
                        )}
                        renderOption={(props, user) => (
                            <Typography sx={{ padding: 0, margin: 0, display: 'none' }} {...props} key={user?.userName}>
                                {user?.FirstName} {user?.LastName}
                            </Typography>
                        )}
                        noOptionsText={(searchQuery.length >= 2 && employees.length <= 0) ? "No options" : "Please enter at least one letters to search."}
                    />
                    <DateRangePicker
                    // value={value}
                    // onChange={(newValue) => setValue(newValue)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DilaogReport