import React, { useState } from 'react'
import TimeTrackerButton from './TimeTrackerButton'
import StyledTimeTrackerContainer from '../Styled/StyledTimeTrackerContainer'
import PunchInDialog from './PunchInDialog'
import PunchOutDialog from './PunchOutDialog'
import ClockTracker from './Clock/ClockTracker'
function TimeTracker() {
    const [punchIn, setPunchIn] = useState(false)
    const [punchOut, setPunchOut] = useState(false)
    const [breakIn, setBreakIn] = useState(false)
    const [breakOut, setbreakOut] = useState(false)

    console.log(punchIn, punchOut, breakIn, breakOut)
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
        setbreakOut(value)
    }
    const closePunchInHandler = () => {
        setPunchIn(false)
    }
    const closePunchOutHandler = () => {
        setPunchOut(false)
    }
    return (
        <StyledTimeTrackerContainer>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', background: '#FFAC1C', width: '100%', padding: '50px ' }}>
                <ClockTracker />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px', backgroundColor: '#2F4F4F', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', }}>
                <TimeTrackerButton title={"PUNCH IN"} onClick={clickPunchInHandler} />
                <TimeTrackerButton title={"PUNCH OUT"} onClick={clickPunchOutHandler} />
                <TimeTrackerButton title={"BREAK IN"} onClick={clickBreakInHandler} />
                <TimeTrackerButton title={"BREAK OUT"} onClick={clickBreakOutHandler} />
            </div>
            <PunchInDialog open={punchIn} onClose={closePunchInHandler} />
            <PunchOutDialog open={punchOut} onClose={closePunchOutHandler} />
        </StyledTimeTrackerContainer>
    )
}

export default TimeTracker