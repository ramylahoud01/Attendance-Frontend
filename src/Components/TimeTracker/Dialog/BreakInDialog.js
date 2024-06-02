import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import QrScanner from '../../QrCode/QrScanner';
import { Alert, Box } from '@mui/material';


export default function BreakInDialog({ open, onClose }) {
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("")
    const retreiveAlertValueHandler = (status, value, message,) => {
        if (status === 'success') {
            setOpenSuccessAlert(value)
            setAlertMessage(message)
        }
        if (status === 'error') {
            setOpenErrorAlert(value)
            setAlertMessage(message)
        }
    }
    React.useEffect(() => {
        let timer;
        if (openErrorAlert || openSuccessAlert) {
            timer = setTimeout(() => {
                setOpenErrorAlert(false);
                setOpenSuccessAlert(false);
            }, 2000); // Close the alert after 5000ms (5 seconds)
        }
        return () => clearTimeout(timer);
    }, [openErrorAlert, openSuccessAlert]);
    console.log('alertMessage', alertMessage)

    const closeHandler = () => {
        onClose();
        setAlertMessage("")
    }
    return (
        <React.Fragment>
            {openErrorAlert && (
                <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
                    <Alert onClose={() => { setOpenErrorAlert(false); setAlertMessage("") }} severity="error">
                        {alertMessage}
                    </Alert>
                </Box>
            )}
            {openSuccessAlert && (
                <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
                    <Alert onClose={() => { setOpenSuccessAlert(false); setAlertMessage("") }} severity='success'>
                        {alertMessage}
                    </Alert>
                </Box>
            )}
            <Dialog
                open={open}
                keepMounted
                onClose={closeHandler}
            >
                <DialogTitle
                    color={"primary"}
                    fontSize="24px"
                    display={"flex"}
                    justifyContent={"center"}
                    fontWeight={'bold'}
                >
                    {"Scan to Break In"}
                </DialogTitle>
                <div style={{ padding: '0px 20px' }}>
                    <QrScanner open={open} breakIn={true} onClose={onClose} retreiveAlertValue={retreiveAlertValueHandler} />
                </div>
                <DialogActions>
                    <Button onClick={closeHandler} variant='contained'>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}