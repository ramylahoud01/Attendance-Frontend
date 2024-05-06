import React, { useState } from 'react'
import TimeTrackerButton from './TimeTrackerButton'
import PunchInDialog from './Dialog/PunchInDialog'
import PunchOutDialog from './Dialog/PunchOutDialog'
import ClockTracker from './Clock/ClockTracker'
import ParticleBackground from '../Styled/ParticleBackground'
import BreakInDialog from './Dialog/BreakInDialog'
import BreakOutDialog from './Dialog/BreakOutDialog'
function TimeTracker() {
    const [punchIn, setPunchIn] = useState(false)
    const [punchOut, setPunchOut] = useState(false)
    const [breakIn, setBreakIn] = useState(false)
    const [breakOut, setBreakOut] = useState(false)

    const clickPunchInHandler = (value) => {
        setPunchIn(value)
    }
    const clickPunchOutHandler = (value) => {
        setPunchOut(value)
    }
    const clickBreakInHandler = (value) => {
        setBreakIn(value)
    }
    const clickBreakOutHandler = (value) => {
        setBreakOut(value)
    }
    const closePunchInHandler = () => {
        setPunchIn(false)
    }
    const closePunchOutHandler = () => {
        setPunchOut(false)
    }
    const closeBreakInHandler = () => {
        setBreakIn(false)
    }
    const closeBreakOutHandler = () => {
        setBreakOut(false)
    }
    return (
        <>
            <ParticleBackground id="particles" />
            <div style={{
                position: 'fixed',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div>
                    <ClockTracker />
                </div>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <TimeTrackerButton title={"PUNCH IN"} onClick={clickPunchInHandler} />
                    <TimeTrackerButton title={"PUNCH OUT"} onClick={clickPunchOutHandler} />
                    <TimeTrackerButton title={"BREAK IN"} onClick={clickBreakInHandler} />
                    <TimeTrackerButton title={"BREAK OUT"} onClick={clickBreakOutHandler} />
                    <TimeTrackerButton title={"CHECK IN"} onClick={clickBreakOutHandler} />
                </div>
            </div>
            <PunchInDialog open={punchIn} onClose={closePunchInHandler} />
            <PunchOutDialog open={punchOut} onClose={closePunchOutHandler} />
            <BreakInDialog open={breakIn} onClose={closeBreakInHandler} />
            <BreakOutDialog open={breakOut} onClose={closeBreakOutHandler} />
        </>
    )
}

export default TimeTracker
