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
        }, 1000); 

        return () => clearInterval(interval); 
    }, []);
    let month = months[date.getMonth()];
    let day = days[date.getDay()]
    return (
        <div style={{ display: 'flex', flexDirection: 'row', borderRadius: '30px', padding: '40px 100px', alignItems: 'center', width: '100%', gap: '30px', marginBottom: '20px', backgroundColor: 'rgba(1,1,1,0.5)' }}>
            <Clock
                value={date}
                renderNumbers={true}
                size={200}
                hourHandLength={90}
                renderMinuteMarks={false}
            />
            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '30px' }}>
                {day}, {month} {date.getDate()} ,{date.getFullYear()}
            </Typography>
        </div>
    );
}

export default ClockTracker;
