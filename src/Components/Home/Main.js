import React, { useEffect } from 'react'
import QrScan from "../Image/QrScan.png"
import FacialScan from "../Image/FacialScan.png"
import UniversityLaSagesse from "../Image/sagesse.jpeg"
import Ecam from "../Image/Ecam.png"
import MainCard from '../Card/MainCard'
import AOS from 'aos';
import 'aos/dist/aos.css';


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
            <div style={{ padding: '10px 50px', width: '100%', display: 'flex', justifyContent: 'end' }}>
                <div >
                    <p style={{ margin: 0, padding: 0, color: '#2F4F4F', fontSize: '12px', fontWeight: 'bold', fontStyle: 'italic' }}>  The project is led by both :  </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <img src={UniversityLaSagesse} alt="QrScan" width={'100px'} height={'100px'} style={{ borderRadius: '10px' }} />
                        <img src={Ecam} alt="QrScan" width={'200px'} height={'100px'} style={{ borderRadius: '10px' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main