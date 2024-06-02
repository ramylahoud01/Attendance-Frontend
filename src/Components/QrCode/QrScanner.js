import React, { useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { PunchInEmployee } from '../../Services/PunchIn.service';
import { PunchOutEmployee } from '../../Services/PunchOut.service';
import { BreakInEmployee } from '../../Services/BreakIn.service';
import { BreakOutEmployee } from '../../Services/BreakOut.service';

const QrScanner = ({ open, punchOut, punchIn, breakIn, breakOut, onClose, retreiveAlertValue }) => {
    const isProcessingRef = useRef(false);

    const handleError = (error) => {
        console.error('QR Scan Error:', error);
    };

    const onResult = async (result) => {
        if (result && !isProcessingRef.current) {
            isProcessingRef.current = true; // Mark as processing to prevent multiple scans

            try {
                let response, data;

                if (punchIn) {
                    response = await PunchInEmployee(result?.text);
                } else if (punchOut) {
                    response = await PunchOutEmployee(result?.text);
                } else if (breakIn) {
                    response = await BreakInEmployee(result?.text);
                } else if (breakOut) {
                    response = await BreakOutEmployee(result?.text);
                }

                if (response) {
                    data = await response.json();
                    if (response.ok) {
                        retreiveAlertValue('success', true, data?.message);
                    } else {
                        retreiveAlertValue('error', true, data?.message);
                    }
                    onClose();
                }
            } catch (error) {
                console.error('Error processing QR code:', error);
                retreiveAlertValue('error', true, 'An error occurred while processing the QR code');
                onClose();
            } finally {
                isProcessingRef.current = false; // Reset processing flag
            }
        }
    };

    return (
        <div style={{ width: '300px' }}>
            {open && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onResult={onResult}
                    style={{ width: '100%' }}
                />
            )}
        </div>
    );
};

export default QrScanner;
