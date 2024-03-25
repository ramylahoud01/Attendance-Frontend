import React, { useEffect } from 'react'
import QrScan from "../Image/QrScan.png"
import FacialScan from "../Image/FacialScan.png"
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
        <div style={{ paddingBottom: '40px' }} >
            {cardData.map((card, index) => (
                <div
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    data-aos-offset="100"
                    data-aos-duration="1500"
                >
                    <MainCard key={index} title={card.title} image={card.image} inReverse={card.inReverse} />
                </div>
            ))}
        </div>
    )
}

export default Main