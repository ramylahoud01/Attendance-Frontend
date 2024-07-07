import React, { useRef, useState, useEffect } from 'react';
import { recognizeFace } from '../Services/Employee.service';

const Test = () => {
    const videoRef = useRef(null);
    const [foundEmployee, setFoundEmployee] = useState(null);
    const [error, setError] = useState(null);
    let intervalId = useRef(null);

    useEffect(() => {
        startVideo();
        return () => {
            clearInterval(intervalId.current);
        };
    }, []);

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
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/jpeg');
            console.log('imageData', imageData)
            // const formData = new FormData();
            // formData.append('image', imageData);

            try {
                const response = await recognizeFace(imageData)
                console.log('response', response)
                if (!response.ok) {
                    throw new Error('Face recognition failed');
                }

                const data = await response.json();
                setFoundEmployee(data.foundEmployee);
                setError(null);
            } catch (error) {
                setError(error.message);
                setFoundEmployee(null);
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
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }}></video>

            <div>
                <button onClick={startRecognition}>Start Recognition</button>
                <button onClick={stopRecognition}>Stop Recognition</button>
            </div>

            {foundEmployee && (
                <div>
                    <h3>Employee Found:</h3>
                    <p>Name: {foundEmployee.FirstName} {foundEmployee.LastName}</p>
                    <p>Email: {foundEmployee.Email}</p>
                    {/* Display other employee details as needed */}
                </div>
            )}

            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Test;
