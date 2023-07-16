import {
    Box,
    Button,
    Container,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField, Typography,
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMomentJalaali} from '@mui/x-date-pickers/AdapterMomentJalaali';
import moment from 'moment-jalaali';
import React, {useEffect, useState} from 'react';
import Api from "../../Api";
import RequestsDataGrid from "./RequestsDataGrid";
import RefreshIcon from '@mui/icons-material/Refresh';
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import './leave-request.css';

moment.loadPersian({dialect: 'persian-modern', usePersianDigits: false});


function LeaveRequests() {
    const [filter, setFilter] = useState({
        createDate: [null, null],
        leaveDate: [null, null],
        name: '',
        type: 0,
        group: 0
    });
    const [data, setData] = useState({rows: []});
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        fetchRequests();
    }, [])

    function handleSelectedRowsChanged(value) {
        setSelectedRows(value);

    }

    async function modifyMultipleRequests(status) {
        let requestsId = selectedRows;
        let data = {status: status};
        try {
            const response = await Api.post('/requests/' + '[' + selectedRows.toString() ']', {...data, _method: 'patch'});
            console.log(response);
            // handle successful response
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

    async function requestModifyHandler() {
        await fetchRequests();
    }

    async function fetchRequests() {
        try {
            const response = await Api.get('/requests', {params: {status: 'pending'}});
            // handle successful response
            console.log(response)
            let data = response.data.data;
            setData({
                rows: data
            });


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
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                درخواست ها
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                از این بخش میتوانید درخواست های ثبت شده توسط کارمندان را تایید یا رد کنید.
            </Typography>
            <Box sx={{
                padding: '24px 0'
            }}>
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
                    <FormControl className={"date-range-picker-container"}>
                        <p>تاریخ ثبت</p>
                        <DateRangePicker
                            localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                            id="create_date"
                            value={filter.createDate}
                            onChange={newValue => setFilter({...filter, createDate: newValue})}>

                        </DateRangePicker>
                    </FormControl>
                    <FormControl className={"date-range-picker-container"}>
                        <p>تاریخ درخواست مرخصی</p>
                        <DateRangePicker
                            localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                            id="leave_date"
                            label="تاریخ مرخصی"
                            value={filter.leaveDate}
                            onChange={newValue => setFilter({...filter, leaveDate: newValue})}>


                        </DateRangePicker>
                    </FormControl>

                    <TextField
                        value={filter.name}
                        label='نام پرسنل'
                        id='employeeNameSearch'
                        name='employeeNameSearch'
                        autoComplete='name'
                        onChange={(e) =>
                            setFilter({...filter, name: e.target.value})}>
                    </TextField>
                    <IconButton
                        sx={{
                            width: '54px'
                        }}
                        size="large"
                        aria-label="refresh"
                        onClick={fetchRequests}
                    >
                        <RefreshIcon></RefreshIcon>
                    </IconButton>
                </Box>
                <Box sx={{marginTop: '8px'}}>
                    <RequestsDataGrid onSelectedRowsChanged={handleSelectedRowsChanged}
                                      filters={filter}
                                      data={data}
                                      onModifyRequest={requestModifyHandler}
                    >

                    </RequestsDataGrid>
                </Box>
                <Box sx={{
                    marginTop: '8px',
                    display: 'flex',
                    gap: '8px'
                }}>
                    <Button disabled={selectedRows.length === 0}
                            variant='contained'
                            onClick={() => modifyMultipleRequests('accepted')}
                            color='success'>
                        تایید همه
                    </Button>
                    <Button disabled={selectedRows.length === 0}
                            variant='contained'
                            onClick={() => modifyMultipleRequests('declined')}
                            color='error'>
                        رد همه
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>

    )
}

export default LeaveRequests;