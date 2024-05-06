import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import QrScanner from '../../QrCode/QrScanner';


export default function PunchInDialog({ open, onClose }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                keepMounted
                onClose={onClose}
            >
                <DialogTitle
                    color={"primary"}
                    fontSize="24px"
                    display={"flex"}
                    justifyContent={"center"}
                    fontWeight={'bold'}
                >
                    {"Scan to Punch In"}
                </DialogTitle>
                <div style={{ padding: '0px 20px' }}>
                    <QrScanner open={open} punchIn={true} />
                </div>
                <DialogActions>
                    <Button onClick={onClose} variant='contained'>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}