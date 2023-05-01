import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMomentJalaali} from '@mui/x-date-pickers/AdapterMomentJalaali';
import moment from 'moment-jalaali';
import React, {useState} from 'react';
import RTL from "../theme/RTL";
import {theme} from "../theme/rtl-theme";
import Api from "../Api";
import RequestsDataGrid from "./RequestsDataGrid";

moment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});


function LeaveRequests() {
    const [filter, setFilter] = useState({
        fromDate: null,
        toDate: null,
        name: '',
        type: 0,
        group: 0
    });
    const [selectedRows, setSelectedRows] = useState([]);

    function handleSelectedRowsChanged(value) {
        setSelectedRows(value);
    }

    function handleSearch() {

    }

    //function acceptRequest() {
    //}
    async function handleLogOut() {
        try {
            const response = await Api.post('/logout');
            // handle successful response
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                // handle error response
                console.log(error.response.data);
            } else if (error.request) {
                // handle no response
                console.log(error.request);
            } else {
                // handle other errors
                console.log('Error', error.message);
            }
        }
    }

    return (

        <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
            <Container component='main' maxWidth={'lg'}>
                <Box sx={{
                    display: 'flex',
                    marginTop: '8px',
                    gap: '12px'
                }}>
                    <FormControl sx={{
                        minWidth: '150px'
                    }}>
                        <InputLabel id="type-label">نوع مرخصی</InputLabel>
                        <Select
                            autoWidth
                            labelId="type-label"
                            id="type"
                            value={filter.type}
                            onChange={(e) => setFilter({...filter, type: e.target.value})}
                            label="نوع مرخصی"
                            autoFocus
                        >
                            <MenuItem value={0}>همه</MenuItem>
                            <MenuItem value={1}>استحقاقی</MenuItem>
                            <MenuItem value={2}>استعلاحی</MenuItem>
                            <MenuItem value={3}>بدون حقوق</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        minWidth: '150px'
                    }}>
                        <InputLabel id="group-label">گروه پرسنلی</InputLabel>
                        <Select
                            autoWidth
                            labelId="group-label"
                            id="group"
                            value={filter.group}
                            onChange={(e) => setFilter({...filter, group: e.target.value})} label="گروه پرسنلی"
                        >
                            <MenuItem value={1}>مدیران</MenuItem>
                            <MenuItem value={2}>آبدارچی</MenuItem>
                            <MenuItem value={0}>همه</MenuItem>
                        </Select>
                    </FormControl>
                    <DatePicker
                        value={filter.fromDate}
                        onChange={(newValue) => setFilter({...filter, fromDate: newValue})}
                        label="از تاریخ"
                        name="from_date"
                        id="from_date"></DatePicker>
                    <DatePicker
                        value={filter.toDate}
                        onChange={(newValue) => setFilter({...filter, toDate: newValue})}
                        fullWidth
                        margin="normal"
                        label="تا تاریخ"
                        name="from_date"
                        id="from_date">
                    </DatePicker>
                    <TextField
                        value={filter.name}
                        label='نام پرسنل'
                        id='employeeNameSearch'
                        name='employeeNameSearch'
                        autoComplete='name'
                        onChange={(e) =>
                            setFilter({...filter, name: e.target.value})}>
                    </TextField>
                    <Button
                        onClick={handleSearch}
                    >جست و جو</Button>
                </Box>
                <Box sx={{marginTop: '8px'}}>
                    <RequestsDataGrid onSelectedRowsChanged={handleSelectedRowsChanged} filters={filter}>

                    </RequestsDataGrid>
                </Box>
                <Box sx={{
                    marginTop: '8px',
                    display: 'flex',
                    gap: '8px'
                }}>
                    <Button disabled={selectedRows.length === 0} variant='contained'
                            color='success'>تایید همه</Button>
                    <Button disabled={selectedRows.length === 0} variant='contained'
                            color='error'>رد همه</Button>
                    <Button onClick={handleLogOut}>رد همه</Button>
                </Box>

            </Container>
        </LocalizationProvider>

    )
}

export default LeaveRequests;