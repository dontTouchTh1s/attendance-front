import {
    Box,
    Button, Container,
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
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";

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
    const [refreshLoading, setRefreshLoading] = useState(false);
    useEffect(() => {
        fetchRequests();
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
            await Api.post('/requests/', {...data, _method: 'patch'});
            // handle successful response
        } catch (error) {

        }
        await fetchRequests();
        setSelectedRows([]);
    }

    async function requestModifyHandler() {
        await fetchRequests();
    }

    async function fetchRequests() {
        try {
            setRefreshLoading(true);
            const response = await Api.get('/requests');
            setRefreshLoading(false);
            // handle successful response
            let data = response.data.data;
            setData({
                rows: data
            });


        } catch (error) {
            setRefreshLoading(false);
        }
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
            <Box sx={{p: {xs: 1, md: 2}}}>
                <Grid container rowSpacing={{xs: 2}} columnSpacing={{xs: 1}}>
                    <Grid xs={12} sm={6} lg={3}>
                        <FormControl fullWidth>
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
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <FormControl fullWidth>
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
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <FormControl fullWidth>
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
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <TextField
                            fullWidth
                            value={filter.name}
                            label='نام پرسنل'
                            id='employeeNameSearch'
                            name='employeeNameSearch'
                            autoComplete='name'
                            onChange={(e) =>
                                setFilter({...filter, name: e.target.value})}>
                        </TextField>
                    </Grid>
                    <Grid xs={12} lg={5.5}>
                        <FormControl className={"date-range-picker-container"} fullWidth sx={{mt: 2}}>
                            <p>تاریخ درخواست مرخصی</p>
                            <DateRangePicker
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                id="leave_date"
                                label="تاریخ مرخصی"
                                value={filter.leaveDate}
                                onChange={newValue => setFilter({...filter, leaveDate: newValue})}>
                            </DateRangePicker>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={5.5} sx={{mt: 2}}>
                        <FormControl className={"date-range-picker-container"} fullWidth>
                            <p>تاریخ ثبت</p>
                            <DateRangePicker
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                id="create_date"
                                value={filter.createDate}
                                onChange={newValue => setFilter({...filter, createDate: newValue})}>
                            </DateRangePicker>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={1}>
                        <LoadingButton
                            loading={refreshLoading}
                            sx={{height: '100%'}}
                            fullWidth
                            size="large"
                            aria-label="refresh"
                            onClick={fetchRequests}
                            endIcon={<RefreshIcon/>}
                        >
                            بروزرسانی
                        </LoadingButton>
                    </Grid>
                    <Grid xs={12}>
                        <RequestsDataGrid onSelectedRowsChanged={handleSelectedRowsChanged}
                                          selectedRows={selectedRows}
                                          filters={filter}
                                          data={data}
                                          onModifyRequest={requestModifyHandler}
                                          loading={refreshLoading}
                        >
                        </RequestsDataGrid>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <Button disabled={selectedRows.length === 0}
                                fullWidth
                                variant='contained'
                                onClick={() => {
                                    setConfirmModalOpen('true');
                                    setConfirmStatus('accepted');
                                }}
                                color='primary'>
                            تایید همه
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <Button disabled={selectedRows.length === 0}
                                fullWidth
                                variant='contained'
                                onClick={() => {
                                    setConfirmModalOpen('true');
                                    setConfirmStatus('declined');
                                }}
                                color='primary'>
                            رد همه
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}>
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">
                        {confirmStatus === 'accepted' ? ' تایید ' : ' رد '}
                        {' درخواست ها'}</h2>
                    <p id="parent-modal-description">
                        آیا از
                        {confirmStatus === 'accepted' ? ' تایید ' : ' رد '}
                        {selectedRows.length}
                        {' '}
                        درخواست مطمعن هستید؟
                    </p>
                    <Button
                        sx={{
                            marginLeft: '8px'
                        }}
                        variant='contained'
                        onClick={async () => {
                            await modifyMultipleRequests(confirmStatus);
                            setConfirmModalOpen(false)
                        }}
                        color='primary'>
                        بله
                    </Button>
                    <Button
                        sx={{
                            marginLeft: '8px'
                        }}
                        variant='outlined'
                        onClick={() => setConfirmModalOpen(false)}
                        color='secondary'>
                        خیر
                    </Button>
                </Box>
            </Modal>

        </LocalizationProvider>

    )
}

export default LeaveRequests;