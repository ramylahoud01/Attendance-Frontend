import React, { useEffect } from 'react'
import QrScan from "../Image/QrScan.png"
import FacialScan from "../Image/FacialScan.png"
import UniversityLaSagesse from "../Image/sagesse.jpeg"
import Ecam from "../Image/Ecam.png"
import MainCard from '../Card/MainCard'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typography } from '@mui/material'


function Main() {
    const cardData = [
        {
            title: 'Automated Attendance Tracking Solution utilizing QR code technology',
            image: QrScan
        },
        {
            title: 'Facial Recognition Attendance Management System',
            image: FacialScan,
        }
    ];
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div style={{ backgroundColor: '#F8F8F8' }} >
            {cardData.map((card, index) => (
                <div
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    data-aos-offset="100"
                    data-aos-duration="1500"
                >
                    <MainCard key={index} title={card.title} image={card.image} inReverse={card.inReverse} />
                </div>
            ))}
            <Typography sx={{ padding: '10px 50px', width: '100%', display: 'flex', justifyContent: { sm: 'end', xs: 'center' } }}>
                <div >
                    <p style={{ margin: 0, padding: 0, color: '#2F4F4F', fontSize: '12px', fontWeight: 'bold', fontStyle: 'italic', justifyContent: 'center', display: 'flex' }}>  The project is led by both :  </p>
                    <Typography sx={{ display: 'flex', gap: '10px', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <img src={Ecam} alt="QrScan" width={'200px'} height={'100px'} style={{ borderRadius: '10px' }} />
                        </div>
                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <img src={UniversityLaSagesse} alt="QrScan" width={'100px'} height={'100px'} style={{ borderRadius: '10px' }} />
                        </div>
                    </Typography>
                </div>
            </Typography>
        </div>
    )
}

export default Main