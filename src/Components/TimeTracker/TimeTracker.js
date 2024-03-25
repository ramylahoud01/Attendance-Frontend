import React, { useState } from 'react'
import TimeTrackerButton from './TimeTrackerButton'
import StyledTimeTrackerContainer from '../Styled/StyledTimeTrackerContainer'
import PunchInDialog from './PunchInDialog'

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
    return (
        <>
            <StyledTimeTrackerContainer>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <TimeTrackerButton title={"PUNCH IN"} color={'primary'} onClick={clickPunchInHandler} />
                    <TimeTrackerButton title={"PUNCH OUT"} color={'primary'} onClick={clickPunchOutHandler} />
                    <TimeTrackerButton title={"BREAK IN"} color={'tertiary'} onClick={clickBreakInHandler} />
                    <TimeTrackerButton title={"BREAK OUT"} color={'tertiary'} onClick={clickBreakOutHandler} />
                </div>
            </StyledTimeTrackerContainer>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAC5CAAAAABRxsGAAAAB0ElEQVR42u3bS7aCMBAEUPe/ad7wTSBWEeUIuYxUfjeTTqc7vra7Hi9ycnJycnJycnJycnLyp8hf74+9i/fu/f9t7+L+beTk5Nvh1XtnA8fhCPu3kZOTb2mkSEdz+KiTbyMnJz8hP7wtmP3Jyckvji1jJTk5+bw8GFe1BB9n6tetLMjJby8Pqk4f/HRxdY6c/M7yE02b0PZ7HS5y8vvJgyVuMMmnmX+QApCTk78pGAc92HH2fjiu9Mnk5ORx6zaoXVWr6nHxmpycPJmjx42hoAI2rjgHgYicnLxL1+OqcX3iRBWanHwFebpxeDyu4N4qnJGTkydRpgo1aaof7KQiJyePs+gq+Q4e0LeSyMnXlvfV5WD7U7BtIx0NOfmy8iDApEWtmYI2OTn52b0WwWbiIIWf2btBTr6svO/QBsl8OvGnPWJy8mXlwcRfLaj7RfZ3alzk5M+QnyxKV+vhYKzzey3IyR8pr/7JFoSfNGev2rnk5GvLpxPyqh9MTk7+yfy8qmxV7aX5Dhc5Ofk4Fkx/ncrPycnJ02S+zyu+XYUmJ3+QvOrzBvEmTb7nYws5+cPl1SbDcc6eZvlpi4icfG35LQ5ycnJycnJycnJycnLyOx5/SwaHhpNYQG8AAAAASUVORK5CYII=" alt="QR Code"></img>
            <PunchInDialog open={punchIn} onClose={closePunchInHandler} />
        </>
    )
}

export default TimeTracker