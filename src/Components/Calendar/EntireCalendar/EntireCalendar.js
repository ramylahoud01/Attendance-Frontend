import React, { useEffect, useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { displayAllSchedule } from '../../../Services/Schedule.service';
import "./EntireCalendar.css"
import { Typography } from '@mui/material';
function EntireCalendar() {
    const [schedules, setSchedules] = useState([])
    const PunchedStatus = [
        { title: 'OFF', value: 'OFF' }, { title: 'Late', value: 'late' }, { title: 'Leaving Early', value: 'LeavingEarly' }, { title: 'on Time', value: 'onTime' }, { title: 'Late & Leaving Early', value: 'lateAndLeavingEarly' },
    ]
    useEffect(() => {
        const fetchSchedules = async () => {
            const response = await displayAllSchedule()
            const data = await response.json()
            if (response.ok) {
                setSchedules(data.foundSchedules)
            }
        }
        fetchSchedules()
    }, [])

    const events = schedules.map(schedule => ({
        title: `${schedule.EmployeeID.FirstName} ${schedule.EmployeeID.LastName}`,
        start: schedule.PunchStatus === 'OFF' ? schedule.FromDate : schedule.PunchInID.StartingDate,
        color: '#2F4F4F',
        PunchStatus: schedule.PunchStatus
    }));


    console.log('schedules', schedules)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
                    selectable={true}
                    timeZone="Asia/Beirut"
                    events={events}
                    eventContent={eventContent}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                {PunchedStatus.map((item, index) =>
                    <div style={{ border: '1.5px solid #e0e0e0', display: 'flex', width: '180px', height: '30px', backgroundColor: 'white' }} key={index}>
                        <Typography style={{ backgroundColor: item.value === 'OFF' ? '#B22222' : item.value === 'late' ? '	#FFFF99' : item.value === 'LeavingEarly' ? '#87CEFA' : item.value === 'onTime' ? '#90EE90' : '#b785a7', width: '20px' }}></Typography>
                        <Typography sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.title}</Typography>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EntireCalendar
const eventContent = ({ event }) => {
    const status = event.extendedProps.PunchStatus
    return (
        <div style={{ backgroundColor: status === 'OFF' ? '#B22222' : status === 'late' ? '	#FFFF99' : status === 'LeavingEarly' ? '#87CEFA' : status === 'onTime' ? '#90EE90' : '#b785a7', padding: '5px 3px', color: '#202020', fontWeight: 'bold', width: '100%', borderRadius: '4px' }}> {event.title} </div>
    );
};