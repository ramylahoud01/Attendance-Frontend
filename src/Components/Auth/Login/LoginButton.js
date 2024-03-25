import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function LoginButton() {
    return (
        <Stack sx={{ margin: '10px 0px 20px 0px', display: 'flex', flexDirection: 'column', gap: '5px' }} >
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 550,
                        cursor: "pointer",
                        '&:hover': {
                            textDecoration: 'underline'
                        },

                    }}
                    color={'secondary'}
                >
                    Forgot password?
                </Typography>
            </Link>
            <Button variant='contained' type='submit'>
                Sign In
            </Button>
        </Stack>
    )
}

export default LoginButton