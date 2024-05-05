import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './ClockTracker.css';
import { Typography } from "@mui/material"
function ClockTracker() {
    const [date, setDate] = useState(new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);
    let month = months[date.getMonth()];
    let day = days[date.getDay()]
    return (
        <div className="clock-container" style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly' }}>
            <Clock
                value={date}
                renderNumbers={true}
                size={250}
                hourHandLength={90}
                renderMinuteMarks={false}
            />
            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
                {day}, {month} {date.getDate()} ,{date.getFullYear()}
            </Typography>
        </div>
    );
}

export default ClockTracker;
