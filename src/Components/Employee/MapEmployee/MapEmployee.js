import React, { useState } from 'react';
import MapEmployeeHeader from './MapEmployeeHeader';
import MapEmployeeContainer from './MapEmployeeContainer';
import 'aos/dist/aos.css';
import StyledSearchQuery from '../../Styled/StyledSearchQuery';
import StyledPagination from '../../Styled/StyledPagination';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const MapEmployee = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0)
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20)
    const navigate = useNavigate()
    const retreiveQueryHandler = (retreivedQuery) => {
        setQuery(retreivedQuery)
    }
    const retreiveTotalEmployeeHandler = (count) => {
        setTotalEmployee(count)
    }
    const retreiveRowsPerPageHandler = (rowsPerPage) => {
        setRowsPerPage(rowsPerPage)
    }
    const retreivePageHandler = (page) => {
        setPage(page)
    }
    const redirectButtonHandler = () => {
        navigate('/newEmployee')
    }
    return (
        <div style={{ padding: '10px 30px 40px 30px', }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <MapEmployeeHeader title={'Meet Our Exceptional Team :'} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div>
                        <StyledSearchQuery retreiveQuery={retreiveQueryHandler} />
                    </div>
                    <div>
                        <Button startIcon={<PersonAddAltIcon />} onClick={redirectButtonHandler} variant='outlined' style={{ fontWeight: 'bold' }}>
                            New Member
                        </Button>
                    </div>
                </div>
            </div>
            <MapEmployeeContainer query={query} retreiveTotalEmployee={retreiveTotalEmployeeHandler} rowsPerPage={rowsPerPage} page={page} />
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '30px 0px', alignItems: 'center' }}>
                <StyledPagination count={totalEmployee} retreiveRowsPerPage={retreiveRowsPerPageHandler} retreivePage={retreivePageHandler} query={query} />
            </div>
        </div>
    );
}

export default MapEmployee;
