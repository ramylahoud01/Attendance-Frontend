import React, { useEffect, useState } from 'react'
import { displaySummaryScheduleforReports } from '../../Services/Schedule.service'
import { Autocomplete, Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import FallBack from '../FallBack/FallBack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { displayEmployeeForAutoComplete } from '../../Services/Employee.service';
import DilaogReport from '../Schedule/EntireSchedule/DilaogReport';
function SummaryReports() {
    const PunchStatus = [
        { value: 'All', name: 'All' },
        { value: 'onTime', name: 'on Time' },
        { value: 'late', name: 'Late' },
        { value: 'LeavingEarly', name: 'Leaving Early' },
        { value: 'lateAndLeavingEarly', name: 'Late & Leaving Early' },
        { value: 'OFF', name: 'OFF' },
    ]
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedValue, setSelectedValue] = useState(PunchStatus[0].value);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [employees, setEmployees] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState("")
    const columns = [
        { id: 'EmployeeName', label: 'Employee', minWidth: 140 },
        { id: 'Shiftwork', label: 'Shift Work', minWidth: 140 },
        { id: 'FullDate', label: 'Date', minWidth: 140 },
        { id: 'PunchIn', label: 'Punch In', minWidth: 140 },
        { id: 'PunchOut', label: 'Punch Out', minWidth: 140 },
        { id: 'BreakIn', label: 'Break In', minWidth: 140 },
        { id: 'BreakOut', label: 'Break Out', minWidth: 140 },
        { id: 'PunchStatus', label: 'Punch Status', minWidth: 140 }
    ];
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchSchedules = async () => {
            setIsLoading(true)
            const response = await displaySummaryScheduleforReports(selectedDate, selectedEmployee?._id, selectedValue)
            const data = await response.json()
            if (response.ok) {
                setRows(data)
            }
            setIsLoading(false)
        }
        const fetchEmployees = async () => {
            const response = await displayEmployeeForAutoComplete(searchQuery)
            const data = await response.json()
            if (response.ok) {
                setEmployees(data?.employees)
            }
        }
        fetchEmployees()
        fetchSchedules()
    }, [selectedDate, searchQuery, selectedEmployee, selectedValue])
    const changeEmployeeHandler = (event, newValue) => {
        setSelectedEmployee(newValue)
    }
    const changeHandler = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };
    const clickDialogReportHandler = () => {
        setOpenDialog(true)
    }
    const handleClose = () => {
        setOpenDialog(false)
    }
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'white', borderTop: '1px solid #e0e0e0', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', padding: '10px 15px', justifyContent: 'space-between' }} >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', }} >
                    <Typography sx={{ fontWeight: 'bold' }}>Filters :</Typography>
                    <DatePicker
                        label="Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        views={['year', 'month', 'day']}
                    />
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
                                size='large'
                                sx={{ backgroundColor: 'white', width: { sm: '246.22px', xs: '100%' } }}
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
                    <Select
                        labelId="demo-simple-select-label"
                        value={selectedValue}
                        sx={{ m: 0, p: 0, width: { xs: '25ch' } }}
                        onChange={changeHandler}
                    >
                        {PunchStatus.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Button variant='contained' onClick={clickDialogReportHandler} sx={{ fontSize: '12px' }}>Reports</Button>
                </div>
            </div>
            <div style={{ backgroundColor: 'white', }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                    <Table /*stickyHeader*/ aria-label="sticky table" sx={{ borderCollapse: 'collapse' }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column, columnIndex) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth, fontWeight: 'bold', border: '1px solid #e0e0e0' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {!isLoading ? (
                            rows?.length > 0 ? (
                                <TableBody>
                                    {rows.map((row, rowIndex) => (
                                        <TableRow tabIndex={-1} key={rowIndex}>
                                            {columns?.map((column, columnIndex) => (
                                                <TableCell key={column.id} align="center" style={{ border: '1px solid #e0e0e0' }}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <Typography sx={{ fontWeight: 'bold' }}>No Schedule Available</Typography>
                            )
                        ) : (
                            <FallBack />
                        )}

                    </Table>
                </TableContainer>
            </div>
            <DilaogReport handleClose={handleClose} openDialog={openDialog} />
        </>
    )
}

export default SummaryReports