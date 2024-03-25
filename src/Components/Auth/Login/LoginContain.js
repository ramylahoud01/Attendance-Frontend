import React from 'react'
import StyledTextField from '../../Styled/StyledTextField'
import { Typography } from '@mui/material'

function LoginContain({ retreiveEmail, retreivePassword }) {
    const changeEmailHandler = (value) => {
        retreiveEmail(value)
    }
    const changePasswordHandler = (value) => {
        retreivePassword(value)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='span' component={'span'} style={{ display: 'flex', margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Email <span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span' >*</span></Typography>
                <StyledTextField type={'email'} placeholder={'email@example.com'} onChange={changeEmailHandler} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='span' component={'span'} style={{ margin: '0 0 2px 0', padding: 0, color: '#2F4F4F', fontSize: '14px', fontFamily: 'bold' }}>Password<span style={{ color: '#8B0000', marginLeft: '3px' }} variant='span'>*</span></Typography>
                <StyledTextField type={'password'} placeholder={'Password'} onChange={changePasswordHandler} />
            </div>
        </div>
    )
}

export default LoginContain