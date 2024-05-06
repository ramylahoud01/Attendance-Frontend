import { Avatar, Card, Divider, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import jsPDF from 'jspdf'
import Logo from "../Image/Boulanger-Logo.png"
function EmployeeCard({ employee }) {
    console.log('employee', employee)
    const typographyStyles = {
        fullName: {
            fontSize: "15px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500
        },
        role: {
            fontSize: "12px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 550
        },
        email: {
            fontSize: '13px',
            fontWeight: 500,
            color: '#707070',
            fontFamily: "'Poppins', sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "200px"
        },
        jobTitle: {
            fontWeight: 500,
            fontSize: '13px',
            color: '#707070',
            fontFamily: "'Poppins', sans-serif",
            marginTop: '3px'
        },
        attendance: {
            fontWeight: 550,
            fontSize: '12px',
            fontFamily: "'Poppins', sans-serif",
            textDecoration: 'underline',
            "&:hover": {
                cursor: 'pointer'
            },
        }
    };
    const printQrCodeHandler = () => {
        const doc = new jsPDF()
        const qrWidth = 80; // Width of the QR code
        const qrHeight = 80; // Height of the QR code
        const imgWidth = 40;
        const imgHeight = 14;
        const pageWidth = doc.internal.pageSize.getWidth();
        const imageX = pageWidth - imgWidth - 18;
        const qrX = (pageWidth - qrWidth) / 2;
        doc.addImage(Logo, "JPEG", imageX, 5, imgWidth, imgHeight);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(47, 79, 79);
        doc.text(`${employee.FirstName} ${employee.LastName} QR Code :`, 20, 15);

        const qrImage = new Image();
        qrImage.src = `data:image/png;base64,${employee.QRCodeID.Content}`;
        doc.addImage(qrImage, 'PNG', qrX, 50, qrWidth, qrHeight);


        doc.save(`${employee.FirstName.charAt(0).toUpperCase() + employee.FirstName.slice(1)}${" "}${employee.LastName.charAt(0).toUpperCase() + employee.LastName.slice(1)}-QrCode`);
    }
    return (
        <Card sx={{ position: 'relative' }} key={employee._id}>
            <div style={{ display: "flex", flexDirection: "row", margin: '10px 10px 5px 10px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 50, height: 50, }}>
                        {employee.FirstName.charAt(0).toUpperCase()}
                        {employee.LastName.charAt(0).toUpperCase()}
                    </Avatar>
                </div>
                <div style={{ display: "flex", flexDirection: "column", margin: '5px 0px 0px 12px', gap: '1px' }}>
                    <Typography sx={typographyStyles.fullName} color={'primary'}>
                        {employee.FirstName.charAt(0).toUpperCase() + employee.FirstName.slice(1)}{" "}{employee.LastName.charAt(0).toUpperCase() + employee.LastName.slice(1)} /
                        <Typography color={'secondary'} variant='span' sx={typographyStyles.role}> {employee.Role}</Typography>
                    </Typography>
                    <Typography sx={typographyStyles.attendance} color={'primary'} onClick={printQrCodeHandler}>
                        Generate QR Code
                    </Typography>
                </div>
                {/* <div style={{ margin: '5px 0px 0px 10px', position: 'absolute', right: 0 }}>
                    <img src={`data:image/png;base64,${employee.QRCodeID.Content}`} alt="QR Code" width='100px' height='100px'></img>
                </div> */}
            </div>
            <Divider variant="middle" />
            <div style={{ display: "flex", flexDirection: "column", margin: '10px 15px', gap: '1px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <EmailIcon color="primary" sx={{ fontSize: '18px' }} />
                    <Typography style={typographyStyles.email}>
                        {employee.Email}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <ManageAccountsIcon color="primary" sx={{ fontSize: '18px' }} />
                    <Typography style={typographyStyles.jobTitle}>
                        {employee.JobTitle}
                    </Typography>
                </div>
            </div>
        </Card>
    )
}

export default EmployeeCard