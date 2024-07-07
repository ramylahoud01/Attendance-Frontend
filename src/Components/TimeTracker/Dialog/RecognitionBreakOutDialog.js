import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Box, Alert } from '@mui/material';
import FallBack from '../../FallBack/FallBack';
import { BreakOutEmployee } from '../../../Services/BreakOut.service';

const RecognitionBreakOutDialog = ({ open, onClose }) => {
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("")
    const videoRef = useRef(null);
    const isProcessingRef = useRef(false); // Ref for processing flag
    let intervalId = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (open) {
            startVideo();
            startRecognition();
        } else {
            stopRecognition();
        }

        return () => {
            stopRecognition();
        };
    }, [open]);
    const startVideo = () => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((error) => console.error('Error accessing video stream:', error));
        } else {
            console.error('getUserMedia not supported');
        }
    };

    const captureFrame = async () => {
        if (videoRef.current && !isProcessingRef.current) {
            setIsLoading(true)
            isProcessingRef.current = true; // Mark as processing to prevent multiple captures

            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/jpeg');
            try {
                const response = await BreakOutEmployee(imageData, false);
                const data = await response.json();
                console.log('response', response)
                console.log('data', data)
                if (!response.ok) {
                    setOpenErrorAlert(true)
                    setAlertMessage(data.message)
                } else {
                    setOpenSuccessAlert(true)
                    setAlertMessage(data.message)
                }
                stopRecognition();
                onClose()
            } catch (error) {
                console.log('error', error)
            } finally {
                isProcessingRef.current = false; // Reset processing flag
                setIsLoading(false)
                onClose()
            }
        }
    };

    const startRecognition = () => {
        intervalId.current = setInterval(() => {
            captureFrame();
        }, 1000); // Adjust interval as needed for your application
    };

    const stopRecognition = () => {
        clearInterval(intervalId.current);
    };

    return (
        <>
            {openErrorAlert && (
                <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
                    <Alert onClose={() => setOpenErrorAlert(false)} severity="error">
                        {alertMessage}
                    </Alert>
                </Box>
            )}
            {openSuccessAlert && (
                <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
                    <Alert onClose={() => setOpenSuccessAlert(false)} severity='success'>
                        {alertMessage}
                    </Alert>
                </Box>
            )}
            <Dialog open={open} onClose={!isLoading && onClose} keepMounted>
                <DialogTitle
                    color={"primary"}
                    fontSize="24px"
                    display={"flex"}
                    justifyContent={"center"}
                    fontWeight={'bold'}>
                    Recognition Break Out
                </DialogTitle>
                <div>
                    <div style={{ padding: '0px 20px' }}>
                        <div style={{ width: '300px' }}>
                            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }}></video>
                        </div>
                    </div>
                    {isLoading && <FallBack />}
                </div>
                <DialogActions>
                    <Button onClick={onClose} color="primary" disabled={isLoading}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RecognitionBreakOutDialog;
