import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers-pro";
import {AdapterMomentJalaali} from '@mui/x-date-pickers-pro/AdapterMomentJalaali';
import moment from 'moment-jalaali';
import React, {useEffect, useState} from 'react';
import Api from "../../Api";
import RequestsDataGrid from "./RequestsDataGrid";
import RefreshIcon from '@mui/icons-material/Refresh';
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import './leave-request.css';

moment.loadPersian({dialect: 'persian-modern', usePersianDigits: false});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function LeaveRequests() {
    const [filter, setFilter] = useState({
        createDate: [
            null,
            null],
        leaveDate: [null, null],
        name: '',
        type: 'all',
        group: 0,
        status: 'pending'
    });
    const [confirmStatus, setConfirmStatus] = useState('');
    const [data, setData] = useState({rows: []});
    const [selectedRows, setSelectedRows] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    useEffect(() => {
        fetchRequests();
        console.log('fetching')
    }, [])

    function handleSelectedRowsChanged(value) {
        setSelectedRows(value);

    }

    async function modifyMultipleRequests(status) {
        let row = {
            status: status
        };
        let data = {
            rows: row,
            ids: (selectedRows)
        };

        try {
            const response = await Api.post('/requests/', {...data, _method: 'patch'});
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
        await fetchRequests();
        setSelectedRows([]);
    }

    async function requestModifyHandler() {
        await fetchRequests();
    }

    async function fetchRequests() {
        try {
            const response = await Api.get('/requests');
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

    function openConfirmModal(status) {

        if (status === 'accepted')
            setConfirmStatus('تایید');
        else setConfirmStatus('رد');
        setConfirmModalOpen(true);
    }

    return (

        <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                درخواست ها
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                از این بخش میتوانید درخواست های ثبت شده توسط کارمندان را تایید یا رد کنید. مرخصی ها به صورت نزدیک ترین
                تاریخ مرتب شده اند.
            </Typography>

            <Typography component={'p'} sx={{marginTop: '8px'}}>
                درخواست های های خیلی نزدیک به امروز با رنگ قرمز تری نمایش داده میشوند.
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
                            <MenuItem value={'all'}>همه</MenuItem>
                            <MenuItem value={'paid'}>استحقاقی</MenuItem>
                            <MenuItem value={'sick'}>استعلاحی</MenuItem>
                            <MenuItem value={'noPay'}>بدون حقوق</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        display: 'none',
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

                    <FormControl sx={{
                        minWidth: '150px'
                    }}>
                        <InputLabel id="type-label">وضعیت</InputLabel>
                        <Select
                            autoWidth
                            value={filter.status}
                            onChange={(e) => setFilter({...filter, status: e.target.value})}
                            label="وضعیت"
                            autoFocus
                        >
                            <MenuItem value={'all'}>همه</MenuItem>
                            <MenuItem value={'pending'}>در حال بررسی</MenuItem>
                            <MenuItem value={'accepted'}>تایید شده</MenuItem>
                            <MenuItem value={'declined'}>رد شده</MenuItem>
                        </Select>
                    </FormControl>

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
                            onClick={() => {
                                openConfirmModal('accepted')
                            }}
                            color='success'>
                        تایید همه
                    </Button>
                    <Button disabled={selectedRows.length === 0}
                            variant='contained'
                            onClick={() => {
                                openConfirmModal('declined')
                            }}
                            color='error'>
                        رد همه
                    </Button>
                </Box>
            </Box>

            <Modal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}>
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{confirmStatus}{' درخواست ها'}</h2>
                    <p id="parent-modal-description">
                        آیا از {confirmStatus} {selectedRows.length} درخواست مطمعن هستید؟

                    </p>
                    <Button
                        sx={{
                            marginLeft: '8px'
                        }}
                        disabled={selectedRows.length === 0}
                        variant='contained'
                        onClick={async () => {
                            await modifyMultipleRequests('accepted');
                            setConfirmModalOpen(false)
                        }}
                        color='success'>
                        بله
                    </Button>
                    <Button
                        sx={{
                            marginLeft: '8px'
                        }}
                        disabled={selectedRows.length === 0}
                        variant='contained'
                        onClick={() => setConfirmModalOpen(false)}
                        color='error'>
                        خیر
                    </Button>
                </Box>
            </Modal>


        </LocalizationProvider>

    )
}

export default LeaveRequests;