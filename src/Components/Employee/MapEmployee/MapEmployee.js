import React, { useState } from 'react';
import MapEmployeeHeader from './MapEmployeeHeader';
import MapEmployeeContainer from './MapEmployeeContainer';
import 'aos/dist/aos.css';
import StyledSearchQuery from '../../Styled/StyledSearchQuery';
import StyledPagination from '../../Styled/StyledPagination';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import EmployeeExcelUploader from './EmployeeExcelUploader';
import { BulkInsertEmployee } from '../../../Services/Employee.service';


const MapEmployee = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0)
    const [bulkDialog, setBulkDialog] = useState(false)
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(20)
    const [dialogLoading, setDialogLoading] = useState(false)
    const [dialogErrorMessage, setDialogErrorMessage] = useState("")
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
    const clickBulkHandler = () => {
        setBulkDialog(true)
    }
    const handleClose = () => {
        setBulkDialog(false)
        setDialogErrorMessage('');
    }
    const submitDialogHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            setDialogLoading(true)
            const response = await BulkInsertEmployee(formData);
            const data = await response.json();
            if (!response.ok) {
                setDialogErrorMessage(data);
            } else {
                setDialogErrorMessage('');
                setSelectedFile(null)
                setBulkDialog(false)
            }
        } catch (error) {
        } finally {
            setDialogLoading(false)
        }

    }
    const handleFileChange = (file) => {

        setSelectedFile(file);
    };
    return (
        <>
            <div style={{ padding: '10px 30px 40px 30px', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <MapEmployeeHeader title={'Meet Our Exceptional Team'} />
                    <Typography sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: '10px' }}>
                        <div>
                            <StyledSearchQuery retreiveQuery={retreiveQueryHandler} />
                        </div>
                        <Typography sx={{ display: 'flex', gap: '10px', flexDirection: { xs: 'column', md: 'row' } }}>
                            <div>
                                <Button startIcon={<PersonAddAltIcon />} onClick={redirectButtonHandler} variant='outlined' style={{ fontWeight: 'bold' }}>
                                    New Member
                                </Button>
                            </div>
                            <div>
                                <Button startIcon={<GroupAddIcon />} onClick={clickBulkHandler} variant='outlined' style={{ fontWeight: 'bold' }}>
                                    Bulk Insert
                                </Button>
                            </div>
                        </Typography>
                    </Typography>
                </div>
                <MapEmployeeContainer query={query} retreiveTotalEmployee={retreiveTotalEmployeeHandler} rowsPerPage={rowsPerPage} page={page} />
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '30px 0px', alignItems: 'center' }}>
                    <StyledPagination count={totalEmployee} retreiveRowsPerPage={retreiveRowsPerPageHandler} retreivePage={retreivePageHandler} query={query} />
                </div>
            </div>
            <Dialog
                open={bulkDialog}
                onClose={handleClose}
            >
                <div style={{ backgroundColor: '#F8F8F8' }}>
                    <h2 style={{ color: 'rgb(19, 32, 60)', textAlign: 'center' }}>Bulk Insert</h2>
                </div>
                <DialogContent style={{ backgroundColor: '#F8F8F8' }}>
                    <Form
                        style={{ display: "flex", flexDirection: "column", position: 'relative' }}
                        encType="multipart/form-data"
                        onSubmit={submitDialogHandler}
                    >
                        <Stack direction={{ sm: "row", xs: "column" }} sx={{ width: { sm: '400px', xs: '100%' } }} spacing={2} mt={"10px"}>
                            <EmployeeExcelUploader
                                sx={{ width: "150px", height: "150px" }}
                                getSelectedFile={handleFileChange}
                                name={'csvFile'}
                                isCSV={true}
                            />
                        </Stack>
                        {dialogErrorMessage &&
                            dialogErrorMessage.message.split(",").map((error, index) => (
                                <Typography key={index} variant="p" color="error" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                                    {error}
                                </Typography>
                            ))}
                        <Button
                            type='submit'
                            sx={{ mt: "20px" }}
                            color="primary"
                            variant="contained"
                            disabled={dialogLoading}
                        >
                            {dialogLoading ? 'Inserting' : 'Insert'}
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MapEmployee;
