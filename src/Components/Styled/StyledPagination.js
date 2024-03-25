import { TablePagination } from '@mui/material';
import React, { useEffect } from 'react'

function StyledPagination({ count, retreiveRowsPerPage, retreivePage, query }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        retreivePage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        retreiveRowsPerPage(parseInt(event.target.value))
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    useEffect(() => {
        if (query) {
            setPage(0);
            retreivePage(0)
        }
    }, [query, retreivePage]);
    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100]}
        />
    );
}

export default StyledPagination