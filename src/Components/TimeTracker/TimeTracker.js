import React, { useState } from 'react'
import TimeTrackerButton from './TimeTrackerButton'
import PunchInDialog from './Dialog/PunchInDialog'
import PunchOutDialog from './Dialog/PunchOutDialog'
import ClockTracker from './Clock/ClockTracker'
import ParticleBackground from '../Styled/ParticleBackground'
import BreakInDialog from './Dialog/BreakInDialog'
import BreakOutDialog from './Dialog/BreakOutDialog'
import RecognitionPunchInDialog from './Dialog/RecognitionPunchInDialog'
import { Switch, Typography } from '@mui/material';
import RecognitionPunchOutDialog from './Dialog/RecognitionPunchOutDialog'
import RecognitionBreakInDialog from './Dialog/RecognitionBreakInDialog'
import RecognitionBreakOutDialog from './Dialog/RecognitionBreakOutDialog'
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

function TimeTracker() {
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    console.log('largeScreen', largeScreen)
    const [punchIn, setPunchIn] = useState(false)
    const [punchOut, setPunchOut] = useState(false)
    const [breakIn, setBreakIn] = useState(false)
    const [breakOut, setBreakOut] = useState(false)
    const [punchInRecognition, setPunchInRecognition] = useState(false)
    const [punchOutRecognition, setPunchOutRecognition] = useState(false)
    const [breakInRecognition, setBreakInRecognition] = useState(false)
    const [breakOutRecognition, setBreakOutRecognition] = useState(false)
    const [useFaceRecognition, setUseFaceRecognition] = useState(false)

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
    const handlePunchInRecognition = () => {
        setPunchInRecognition(true)
    }
    const handlePunchOutRecognition = () => {
        setPunchOutRecognition(true)
    }
    const handleBreakInRecognition = () => {
        setBreakInRecognition(true)
    }
    const handleBreakOutRecognition = () => {
        setBreakOutRecognition(true)
    }
    const closePunchInRecognitionHandler = () => {
        setPunchInRecognition(false)
    }
    const closePunchOutRecognitionHandler = () => {
        setPunchOutRecognition(false)
    }
    const closeBreakInRecognitionHandler = () => {
        setBreakInRecognition(false)
    }
    const closeBreakOutRecognitionHandler = () => {
        setBreakOutRecognition(false)
    }

    const handleSwitchChange = () => {
        setUseFaceRecognition(prev => !prev)
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
                {!smallScreen && <div>
                    <ClockTracker largeScreen={largeScreen} smallScreen={smallScreen} />
                </div>}
                {/* <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <TimeTrackerButton title={"PUNCH IN"} onClick={clickPunchInHandler} />
                    <TimeTrackerButton title={"PUNCH OUT"} onClick={clickPunchOutHandler} />
                    <TimeTrackerButton title={"BREAK IN"} onClick={clickBreakInHandler} />
                    <TimeTrackerButton title={"BREAK OUT"} onClick={clickBreakOutHandler} />
                    <div>
                        <p style={{ padding: 0, margin: 0, color: 'white', marginLeft: '10px' }}>Face</p>
                        <Switch checked={useFaceRecognition} onChange={handleSwitchChange} />
                    </div>
                </div> */}
                {useFaceRecognition ? (
                    <Typography sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '4px', justifyContent: 'center' }}>
                        <TimeTrackerButton title={"PUNCH IN"} onClick={handlePunchInRecognition} />
                        <TimeTrackerButton title={"PUNCH OUT"} onClick={handlePunchOutRecognition} />
                        <TimeTrackerButton title={"BREAK IN"} onClick={handleBreakInRecognition} />
                        <TimeTrackerButton title={"BREAK OUT"} onClick={handleBreakOutRecognition} />
                        <div style={{ backgroundColor: '#A9A9A9', padding: '5px 5px', borderRadius: '4px' }}>
                            <span style={{ color: 'white', fontWeight: 'bold', }}>Face</span>
                            <Switch checked={useFaceRecognition} onChange={handleSwitchChange} />
                        </div>
                    </Typography>
                ) : (
                    <Typography sx={{ display: 'flex', gap: '4px', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center' }}>
                        <TimeTrackerButton title={"PUNCH IN"} onClick={clickPunchInHandler} />
                        <TimeTrackerButton title={"PUNCH OUT"} onClick={clickPunchOutHandler} />
                        <TimeTrackerButton title={"BREAK IN"} onClick={clickBreakInHandler} />
                        <TimeTrackerButton title={"BREAK OUT"} onClick={clickBreakOutHandler} />
                        <div style={{
                            backgroundColor: '#A9A9A9',
                            padding: '5px 5px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>Qr Code</span>
                            <Switch checked={useFaceRecognition} onChange={handleSwitchChange} />
                        </div>

                    </Typography>
                )}
            </div>
            <PunchInDialog open={punchIn} onClose={closePunchInHandler} />
            <PunchOutDialog open={punchOut} onClose={closePunchOutHandler} />
            <BreakInDialog open={breakIn} onClose={closeBreakInHandler} />
            <BreakOutDialog open={breakOut} onClose={closeBreakOutHandler} />
            <RecognitionPunchInDialog open={punchInRecognition} onClose={closePunchInRecognitionHandler} />
            <RecognitionPunchOutDialog open={punchOutRecognition} onClose={closePunchOutRecognitionHandler} />
            <RecognitionBreakInDialog open={breakInRecognition} onClose={closeBreakInRecognitionHandler} />
            <RecognitionBreakOutDialog open={breakOutRecognition} onClose={closeBreakOutRecognitionHandler} />
        </>
    )
}

export default TimeTracker
