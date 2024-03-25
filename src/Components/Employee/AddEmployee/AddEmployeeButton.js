import { Button, Stack } from '@mui/material'
import React from 'react'
import StyledLoadingIcon from '../../Styled/StyledLoadingIcon'

function AddEmployeeButton({ role, isLoading }) {
    return (
        <Stack sx={{ margin: '20px 0px 20px 0px' }}>
            <Button variant='contained' type='submit' disabled={isLoading}>
                {isLoading && <StyledLoadingIcon />}
                <p style={{ margin: 0, padding: 0, marginLeft: '20px' }}>New {role} Member</p>
            </Button>
        </Stack>
    )
}

export default AddEmployeeButton