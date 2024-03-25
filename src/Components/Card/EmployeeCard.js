import { Avatar, Card, Divider, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function EmployeeCard({ employee }) {
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
        }
    };
    console.log('employee', employee.QRCodeID.Content)
    return (
        <Card sx={{ position: 'relative' }} key={employee._id}>
            <div style={{ display: "flex", flexDirection: "row", margin: '10px 10px 5px 10px', position: 'relative' }}>
                <Avatar sx={{ width: 50, height: 50 }}>
                    {employee.FirstName.charAt(0).toUpperCase()}
                    {employee.LastName.charAt(0).toUpperCase()}
                </Avatar>
                <div style={{ display: "flex", flexDirection: "column", margin: '5px 0px 0px 10px' }}>
                    <Typography sx={typographyStyles.fullName} color={'primary'}>
                        {employee.FirstName.charAt(0).toUpperCase() +
                            employee.FirstName.slice(1)}{" "}
                        {employee.LastName.charAt(0).toUpperCase() + employee.LastName.slice(1)}
                    </Typography>
                    <Typography sx={typographyStyles.role} color={'secondary'}>
                        {employee.Role}
                    </Typography>
                </div>
                <div style={{ margin: '5px 0px 0px 10px', position: 'absolute', right: 0 }}>
                    <img src={`data:image/png;base64,${employee.QRCodeID.Content}`} alt="QR Code" width='25px' height='25px'></img>
                </div>
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