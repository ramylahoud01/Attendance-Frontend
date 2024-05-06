import { Autocomplete, Dialog, DialogActions, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { displayEmployeeForAutoComplete } from '../../../Services/Employee.service'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import "./DialogReport.css"
import StyledDropDown from '../../Styled/StyledDropDown';
import StyledButtonGroup from '../../Styled/StyledButtonGroup';


function DilaogReport({ openDialog, handleClose }) {
    const [employees, setEmployees] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState("")
    const [selectedDate, setSelectedDate] = useState([null, null])
    const [role, setRole] = useState("")
    const [scheduleReportsData, setScheduleReportsData] = useState()
    const [emptyRole, setRoleToEmpty] = useState(false)
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
    const changeRoleHandler = (value) => {
        setSelectedEmployee("")
        setRole(value)
    }
    const changeDatePickerHandler = (newValue) => {
        setSelectedDate(newValue)
    }
    const resetHandler = () => {
        setSelectedDate([null, null]);
        setSelectedEmployee("")
        setRoleToEmpty(true)
        setRole("")
        setScheduleReportsData("")
    }
    const updateRoleValueHandler = () => {
        setRoleToEmpty(false)
    }
    return (
        openDialog &&
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle style={{ textAlign: 'center', fontSize: '17px', fontWeight: 'bold' }}>
                {"Please select your report filter"}
            </DialogTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", padding: '10px', width: '100%' }}>
                <Stack direction={{ sm: "row", xs: "column" }} spacing={1}>
                    <Autocomplete
                        name="Employee"
                        id="filled-select-currency"
                        options={employees || []}
                        getOptionLabel={(employee) => `${employee?.FirstName} ${employee?.LastName}`}
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        value={selectedEmployee || null}
                        onChange={changeEmployeeHandler}
                        onInputChange={(event, newInputValue) => { setSearchQuery(newInputValue) }}
                        disabled={role !== ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Employee"
                                size='small'
                                sx={{ backgroundColor: 'white', width: { sm: '222.4px', xs: '100%' } }}
                            />
                        )}
                        renderOption={(props, user) => (
                            <Typography sx={{ padding: 0, margin: 0, display: 'none' }} {...props} key={user?.userName}>
                                {user?.FirstName} {user?.LastName}
                            </Typography>
                        )}
                        noOptionsText={(searchQuery.length >= 2 && employees.length <= 0) ? "No options" : "Please enter at least one letters to search."}
                        style={{ flex: 1 }}
                    />
                    <StyledDropDown
                        name={'Role'}
                        onChange={changeRoleHandler}
                        backgroundColor={'white'}
                        height='100%'
                        dialog={true}
                        emptyRole={emptyRole}
                        updateRoleValue={updateRoleValueHandler}
                        disabled={selectedEmployee !== "" && selectedEmployee !== null}
                    />
                </Stack>
                <div style={{ display: 'flex', width: '100%' }}>
                    <DateRangePicker
                        slotProps={{ textField: { size: 'small', sx: { width: '100%' } } }}
                        value={selectedDate}
                        onChange={changeDatePickerHandler}
                    />
                </div>
            </div>
            <DialogActions>
                <StyledButtonGroup scheduleReportsData={scheduleReportsData} reset={resetHandler} close={handleClose} selectedEmployee={selectedEmployee} role={role} selectedDate={selectedDate} />
            </DialogActions>
        </Dialog>
    )
}

export default DilaogReport