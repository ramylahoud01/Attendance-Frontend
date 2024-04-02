import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapScheduleById, newSchedule, } from "../../../Services/Schedule.service";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
 
const MySchedule = () => {
    const { EmployeeId } = useParams();
    const [schedules, setSchedules] = useState(['']);
    const [openDialog, setOpenDialog] = useState(false)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const handleDateSelect = (selectInfo) => {
        const startWithoutOffset = selectInfo.startStr.replace(/\+\d+:\d+$/, '');
        const endWithoutOffset = selectInfo.endStr.replace(/\+\d+:\d+$/, '');
        setFromDate(startWithoutOffset);
        setToDate(endWithoutOffset);
        setOpenDialog(true)
    };

    const events = schedules?.map(schedule => ({
        start: schedule.FromDate,
        end: schedule.ToDate,
        allDay: false,
        color: '#2F4F4F'
    }));

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await MapScheduleById(EmployeeId);
            const schedules = await response.json();
            if (response.ok) {
                setSchedules(schedules.foundSchedules);
            }
        };
        fetchSchedule();
    }, [EmployeeId]);
    const addNewSchedule = async () => {
        const response = await newSchedule(EmployeeId, fromDate, toDate)
        const data = await response.json();
        if (response.ok) {
            const newSchedule = data.savedSchedule
            setSchedules((oldSchedules) => [...oldSchedules, newSchedule]);
        }
        handleClose()
    }
    const handleClose = () => {
        setOpenDialog(false)
        setFromDate("");
        setToDate("")
    }
    return (
        <div style={{ padding: '40px 30px 40px 30px' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
                initialView="timeGridWeek"
                selectable={true}
                select={handleDateSelect}
                events={events}
                allDaySlot={false}
                timeZone="Asia/Beirut"
            />
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle
                    fontSize="18px"
                    display={"flex"}
                    justifyContent={"center"}
                    color={'primary'}
                >
                    {`Are you sure you want to add a new schedule?`}
                    <br />
                    {`From: ${new Date(fromDate).toLocaleString('en-LB', { timeZone: 'Asia/Beirut' })}`}
                    <br />
                    {`To: ${new Date(toDate).toLocaleString('en-LB', { timeZone: 'Asia/Beirut' })}`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="text"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#A9A9A9',
                                color: 'white'
                            }
                        }}>
                        Cancel
                    </Button>
                    <Button onClick={addNewSchedule} color="primary" variant="text"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#2F4F4F',
                                color: 'white'
                            }
                        }}>
                        Add Schedule
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MySchedule;
