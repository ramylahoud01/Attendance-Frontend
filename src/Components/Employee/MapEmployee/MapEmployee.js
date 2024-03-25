import React, { useState } from 'react';
import MapEmployeeHeader from './MapEmployeeHeader';
import MapEmployeeContainer from './MapEmployeeContainer';
import 'aos/dist/aos.css';
import StyledSearchQuery from '../../Styled/StyledSearchQuery';
import StyledPagination from '../../Styled/StyledPagination';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MapEmployee = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0)
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20)
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
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
        },
        link: {
            color: '#2F4F4F',
            textDecoration: 'none',
        },
        typography: {
            display: 'flex',
            alignItems: 'center',
        },
        arrowIcon: {
            transition: 'transform 0.3s ease',
        },
        arrowIconHover: {
            transform: 'translateX(5px)',
        },
    };
    return (
        <div style={{ padding: '10px 30px 40px 30px', }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <MapEmployeeHeader title={'Meet Our Exceptional Team :'} />
                <StyledSearchQuery retreiveQuery={retreiveQueryHandler} />
            </div>
            <MapEmployeeContainer query={query} retreiveTotalEmployee={retreiveTotalEmployeeHandler} rowsPerPage={rowsPerPage} page={page} />
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '30px 0px', alignItems: 'center' }}>
                <StyledPagination count={totalEmployee} retreiveRowsPerPage={retreiveRowsPerPageHandler} retreivePage={retreivePageHandler} query={query} />
                <div style={styles.container}>
                    <Link to="/newEmployee" style={styles.link}>
                        <Typography style={styles.typography}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(20px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                            <Typography>New Employee</Typography>
                            <ArrowForwardIcon
                                style={styles.arrowIcon}
                                className="arrow-icon"
                            />
                        </Typography>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MapEmployee;
