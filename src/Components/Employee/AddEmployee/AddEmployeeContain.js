import React from 'react'
import StyledTextField from '../../Styled/StyledTextField'
import { Stack, Typography } from '@mui/material'
import StyledDropDown from '../../Styled/StyledDropDown'

function AddEmployeeContain({ retreiveRole, retreiveFirstName, retreiveLastName, retreiveEmail, retreivePassword, retreiveJobTitle, retreiveSalaryPerHour, retreiveHoursPerWeek }) {
    const changeFirstNameHandler = (value) => {
        retreiveFirstName(value);
    }

    const changeLastNameHandler = (value) => {
        retreiveLastName(value);
    }

    const changeEmailHandler = (value) => {
        retreiveEmail(value);
    }

    const changePasswordHandler = (value) => {
        retreivePassword(value);
    }

    const changeJobTitleHandler = (value) => {
        retreiveJobTitle(value);
    }

    const changeRoleHandler = (value) => {
        retreiveRole(value)
    }
    const changeSalaryPerHourHandler = (value) => {
        retreiveSalaryPerHour(value);
    }

    const changeHoursPerWeekHandler = (value) => {
        retreiveHoursPerWeek(value);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            <Stack direction={{ sm: "row", xs: 'column' }} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ display: 'flex', margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>First Name <span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span' >*</span></Typography>
                    <StyledTextField type={'text'} placeholder={'First Name'} onChange={changeFirstNameHandler} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Last Name<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledTextField type={'text'} placeholder={'Last Name '} onChange={changeLastNameHandler} />
                </div>
            </Stack>
            <Stack direction={{ sm: "row", xs: 'column' }} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Email<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledTextField type={'text'} placeholder={'email@example.com'} onChange={changeEmailHandler} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Password<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledTextField type={'password'} placeholder={'Password'} onChange={changePasswordHandler} />
                </div>
            </Stack>
            <Stack direction={{ sm: "row", xs: 'column' }} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Job Title<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledTextField type={'text'} placeholder={'Job Title'} onChange={changeJobTitleHandler} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Role<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledDropDown name={'Role'} onChange={changeRoleHandler} />
                </div>
            </Stack>
            <Stack direction={{ sm: "row", xs: 'column' }} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Salary per Hour<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledTextField type={'number'} placeholder={'Salary per Hour'} onChange={changeSalaryPerHourHandler} endAdornment={'$'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Hours/Week<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                    <StyledTextField type={'number'} placeholder={'Hours/Week'} onChange={changeHoursPerWeekHandler} endAdornment={'hours'} />
                </div>
            </Stack>
        </div>
    )
}

export default AddEmployeeContain