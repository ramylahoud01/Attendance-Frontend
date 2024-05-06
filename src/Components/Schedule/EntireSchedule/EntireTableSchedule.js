
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import ArrowDateAvailable from '../../Arrow/ArrowDateAvailable';
import DatePicker from "react-horizontal-datepicker";
import "./EntireTableSchedule.css"
import { DisplayEmployeesFullNameandSchedule } from '../../../Services/Employee.service';
import { generateMultiScheduleFromTable, generateScheduleFromTable } from '../../../Services/Schedule.service';
import { adjustDateForTimezone } from '../../helpers/AdjustTime';
import { Typography, Button, Checkbox } from "@mui/material"
import EntireCalendar from '../../Calendar/EntireCalendar/EntireCalendar';
import DilaogReport from './DilaogReport';
import StyledSearchQuery from '../../Styled/StyledSearchQuery';

export default function EntireTableSchedule() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const PeriodArray = [
        " 10AM - 7PM ",
        " 12PM - 9PM ",
        " 2PM - 11PM ",
        " 4PM - 1AM",
        " OFF ",
    ];
    const initialColumns = [{ id: 'FullName', label: 'Employee', minWidth: 170 }];
    const [columns, setColumns] = useState(initialColumns);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [rows, setRows] = useState([])
    const [employeeSelected, setEmployeeSelected] = useState("")
    const [dateSelected, setDateSelected] = useState("")
    const [multiCheckBoxSelected, setMultiCheckBoxSelected] = useState([])
    const [calendarButtonSelected, setCalendarButtonSelected] = useState(true)
    const [scheduleButtonSelected, setScheduleButtonSelected] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [query, setQuery] = useState("");

    const getNext5Days = (selectedDate) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const formattedDates = [];
        const dates = [];
        const localStringDates = [];
        const today = new Date(selectedDate);
        today.setHours(0, 0, 0, 0);
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
            localStringDates.push(date.toLocaleDateString())
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            let StringDay = days[date.getDay()];
            const formattedDate = `${StringDay} (${day}-${month}-${year})`;
            formattedDates.push(formattedDate);
        }
        return { formattedDates, dates, localStringDates };
    };
    useEffect(() => {
        const { formattedDates, dates, localStringDates } = getNext5Days(selectedDate);
        const newColumns = [
            { id: 'FullName', label: 'Employee', minWidth: 100 },
            ...dates.map((date, index) => ({ id: dates[index], label: formattedDates[index], localStringDates: localStringDates[index], minWidth: 100 }))
        ];
        setColumns(newColumns);
    }, [selectedDate]);

    useEffect(() => {
        const fetchRows = async () => {
            const response = await DisplayEmployeesFullNameandSchedule();
            const data = await response.json();
            setRows(data)
        }
        fetchRows()
    }, [])

    const selectedDay = (val) => {
        // const adjustedDate = adjustDateForTimezone(val)
        setSelectedDate(val)
    };

    //Click into the cell 
    const clickCellHandler = (employee, dateSelected) => {
        setEmployeeSelected(employee)
        const adjustedDateSelected = adjustDateForTimezone(dateSelected)
        setDateSelected(adjustedDateSelected)
    }
    //Change Period using the arrow for a Date 
    const changePeriodUsingArrowHandler = async (value) => {
        const response = await generateScheduleFromTable(employeeSelected, dateSelected, value)
        const data = await response.json()
        if (response.ok) {

            setRows(oldRows => {
                return oldRows.map(oldRow => {
                    if (oldRow.id === data.id) {
                        let updatedSchedules = [...oldRow.schedules];
                        let found = false;
                        updatedSchedules = updatedSchedules.map(schedule => {
                            if (schedule.id === data.date) {
                                found = true;
                                return { ...schedule, date: data.period };
                            }
                            return schedule;
                        });

                        if (!found) {
                            updatedSchedules.push({ id: data.date, date: data.period });
                        }
                        return { ...oldRow, schedules: updatedSchedules };
                    }
                    return oldRow;
                });
            });
            setMultiCheckBoxSelected((oldMultiselectedArray) =>
                oldMultiselectedArray.filter(
                    (item) => !(item.EmployeeID === employeeSelected && item.date === dateSelected.toISOString())
                )
            );
        }
    }
    //Click on the checkBox , push and pull into array multiCheckBoxSelected
    const clickCheckBoxHandler = (event, EmployeeID, dateSelected) => {
        const isChecked = event.target.checked;
        const adjustedDateSelected = adjustDateForTimezone(dateSelected).toISOString()
        if (isChecked) {
            setMultiCheckBoxSelected((oldMultiselectedArray) => [...oldMultiselectedArray, { EmployeeID, date: adjustedDateSelected }])
        } else {
            setMultiCheckBoxSelected((oldMultiselectedArray) =>
                oldMultiselectedArray.filter(
                    (item) => !(item.EmployeeID === EmployeeID && item.date === adjustedDateSelected)
                )
            );
        }
    }
    // add all multiCheckBoxSelected array element to the rows
    const clickMultiPeriodHandler = async (period) => {
        const response = await generateMultiScheduleFromTable(multiCheckBoxSelected, period)
        const data = await response.json()
        console.log('data', data)
        if (response.ok) {
            setRows(oldRows => {
                return oldRows.map(oldRow => {
                    let updatedSchedules = [...oldRow.schedules];
                    for (const row of data) {
                        if (oldRow.id === row.employeeID) {
                            updatedSchedules.push({ id: row.date, date: row.period })
                        }
                    }
                    return { ...oldRow, schedules: updatedSchedules };
                })
            })
            setMultiCheckBoxSelected([])
        }
    }
    const typographyStyles = {
        primary: {
            backgroundColor: '#e0e0e0',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '15px',
            borderTop: '1px solid #e0e0e0',
            borderLeft: '1px solid #e0e0e0',
            borderRight: '1px solid #e0e0e0',
            cursor: 'pointer'
        },
        white: {
            backgroundColor: 'white',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '15px',
            borderTop: '1px solid #e0e0e0',
            borderLeft: '1px solid #e0e0e0',
            borderRight: '1px solid #e0e0e0',
            cursor: 'pointer'
        }
    };

    const clickCalendarButtonHandler = () => {
        setCalendarButtonSelected(true)
        setScheduleButtonSelected(false)
    }
    const clickScheduleButtonHandler = () => {
        setCalendarButtonSelected(false)
        setScheduleButtonSelected(true)
    }
    const clickDialogReportHandler = () => {
        setOpenDialog(true)
    }
    const handleClose = () => {
        setOpenDialog(false)
    }
    const retreiveQueryHandler = (retreivedQuery) => {
        setQuery(retreivedQuery)
    }
    return (
        <>
            <div style={{ padding: '20px 30px 40px 30px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} >
                        <Typography sx={calendarButtonSelected ? typographyStyles.white : typographyStyles.primary} onClick={clickCalendarButtonHandler}>Calendar</Typography>
                        <Typography sx={scheduleButtonSelected ? typographyStyles.white : typographyStyles.primary} onClick={clickScheduleButtonHandler}>Schedule</Typography>
                    </div>
                    {calendarButtonSelected && <div style={{ marginBottom: '4px' }}>
                        <StyledSearchQuery retreiveQuery={retreiveQueryHandler} />
                    </div>}
                </div>
                {scheduleButtonSelected && <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'white', borderTop: '1px solid #e0e0e0', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', padding: '5px 15px', justifyContent: 'space-between' }} >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', }} >
                            <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>Schedule :</Typography>
                            <div style={{ width: '395px', display: 'flex', alignItems: 'center', }}>
                                <DatePicker
                                    getSelectedDay={selectedDay}
                                    selectDate={selectedDate}
                                    labelFormat={"MMMM"}
                                    minDate={new Date(1900, 0, 1)}
                                    color={"#2F4F4F"}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '3px' }}>
                                {PeriodArray.map((period, index) => <Button key={index} variant='contained' onClick={() => clickMultiPeriodHandler(period)} sx={{ fontSize: '12px' }}>{period}</Button>)}
                            </div>
                        </div>
                        <div>
                            <Button variant='contained' onClick={clickDialogReportHandler} sx={{ fontSize: '12px' }}>Reports</Button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white' }}>
                        <TableContainer sx={{ maxHeight: 700 }}>
                            <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: 'collapse' }}>
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
                                <TableBody>
                                    {rows.map((row, rowIndex) => (
                                        <TableRow tabIndex={-1} key={rowIndex}>
                                            {columns.map((column, columnIndex) => {
                                                let dateFound = false;
                                                return (
                                                    <TableCell key={column.id} align="center" style={{ border: '1px solid #e0e0e0', padding: '0px' }}
                                                        onClick={() => clickCellHandler(row.id, column.id)}>
                                                        {column.id !== 'FullName' ? (
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                {
                                                                    row.schedules && row.schedules.map(schedule => {
                                                                        if (schedule.id === column.localStringDates) {
                                                                            dateFound = true;
                                                                            return <p key={schedule.id} style={{ marginLeft: '15px' }}>{schedule.date}</p>;
                                                                        }
                                                                        return null;
                                                                    })
                                                                }
                                                                {!dateFound &&
                                                                    <div style={{ display: 'flex', marginLeft: '15px' }}>
                                                                        <Checkbox size='small' {...label} onClick={(event) => clickCheckBoxHandler(event, row.id, column.id)} />
                                                                        <p > - - Select - - </p>
                                                                    </div>}
                                                                <ArrowDateAvailable onChangeDate={changePeriodUsingArrowHandler} />
                                                            </div>
                                                        ) : (
                                                            row.FullName
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div></>}
                {calendarButtonSelected && <EntireCalendar query={query} />}
            </div>
            <DilaogReport handleClose={handleClose} openDialog={openDialog} />
        </>
    );
}
