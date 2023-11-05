import React, {useState} from 'react';

import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import Api from "../../Api";
import {DatePicker, LocalizationProvider, TimePicker} from '@mui/x-date-pickers-pro';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {AdapterMomentJalaali} from '@mui/x-date-pickers-pro/AdapterMomentJalaali';
import './create-request.css';
import moment from "moment-jalaali";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";

function CreateLeaveRequest() {
    const [type, setType] = useState('paid');
    const [dateRange, setDateRange] = useState([
        moment(),
        moment().add(1, 'days'),
    ]);
    //
    const [fromHour, setFromHour] = useState(moment('2022-04-17T07:30'));
    const [toHour, setToHour] = useState(moment('2022-04-17T10:00'));
    const [description, setDescription] = useState('');
    const [leaveTimingType, setLeaveTimingType] = useState('daily');

    const [descriptionError, setDescriptionError] = useState('');
    const [createRequestLoading, setCreateRequestLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('error');

    async function handleSubmit(e) {
        e.preventDefault();

        if (handleDescriptionError(description))
            return;

        let fromDate = moment(dateRange[0]);
        let toDate = leaveTimingType === 'hourly' ? fromDate.add(1, 'days') : dateRange[1];
        let data = {
            'type': 'leave',
            'leave_type': type,
            'from_date': dateRange[0].format('YYYY-MM-DD'),
            'to_date': toDate.format('YYYY-MM-DD'),
            'description': description
        };

        if (leaveTimingType === 'hourly') {
            data.from_hour = fromHour.format('HH:mm:ss');
            data.to_hour = toHour.format('HH:mm:ss');
        }

        try {
            setCreateRequestLoading(true);
            const response = await Api.post('/requests/create', data);
            if (response.status === 201) {
                setSnackbarOpen(true);
                setSnackbarMessage('درخواست مرخصی با موفقیت ارسال شد.');
                setSnackbarType('success');
            }
            setCreateRequestLoading(false);
            // handle successful response
        } catch (error) {
            setCreateRequestLoading(false);
            if (error.response.status === 406) {
                setSnackbarOpen(true);
                setSnackbarType('error');
                setSnackbarMessage(error.response.data);
            }
        }

    }

    let hourPickerDisplay = leaveTimingType === 'hourly' ? '' : 'hidden';
    let dateRangePicker = leaveTimingType === 'daily' ? '' : 'hidden';

    function handleDateRangeChange(dateRage) {
        setDateRange(dateRage)
    }

    function handleDescriptionError(value) {
        if (value.length < 3) {
            setDescriptionError('لطفا این فیلد را پر کنید.');
            return true;
        } else {
            setDescriptionError('');
            return false;
        }
    }

    function handleSnackBarClose(e, reason) {
        if (reason === 'clickaway')
            return;
        setSnackbarOpen(false);
    }

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                <Typography component="h1" variant="h4">
                    ارسال درخواست مرخصی
                </Typography>
                <Typography component='p' sx={{marginTop: '8px'}}>
                    برای ارسال درخواست مرخصی ابتدا نوع و زمان آن را مشخص کنید، سپس با نوشتن توضیحات آن را ارسال کنید.
                </Typography>
                <Container disableGutters maxWidth={'md'} sx={{p: {xs: 1, md: 2}}}>
                    <Grid container spacing={{xs: 2, md: 3}}>
                        <Grid sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="type-label">نوع مرخصی</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label="نوع مرخصی"
                                    autoFocus
                                >
                                    <MenuItem value={'paid'}>استحقاقی</MenuItem>
                                    <MenuItem value={'sick'}>استعلاجی</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="type-label">نوع خروج</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    value={leaveTimingType}
                                    onChange={(e) => setLeaveTimingType(e.target.value)}
                                    label="نوع مرخصی"
                                    autoFocus
                                >
                                    <MenuItem value={'daily'}>روزانه</MenuItem>
                                    <MenuItem value={'hourly'}>ساعتی</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} container spacing={{xs: 2, md: 3}}
                              className={hourPickerDisplay + " not-hidden"} sx={{maxHeight: 175}}>
                            <Grid xs={12}>
                                <DatePicker
                                    sx={{width: '100%'}}
                                    value={dateRange[0]}
                                    onChange={(newValue) => setDateRange([newValue, newValue])}
                                    label="تاریخ"
                                    name="date"
                                    id="date">
                                </DatePicker>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TimePicker
                                    sx={{width: '100%'}}
                                    label="از ساعت"
                                    value={fromHour}
                                    onChange={(newValue) => setFromHour(newValue)}
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TimePicker
                                    sx={{width: '100%'}}
                                    label="تا ساعت"
                                    minTime={fromHour.clone().add(10, 'minute')}
                                    value={toHour}
                                    onChange={(newValue) => setToHour(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} className={dateRangePicker + " not-hidden"} sx={{maxHeight: 80}}>
                            <DateRangePicker
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                value={dateRange}
                                onChange={handleDateRangeChange}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                error={descriptionError !== ''}
                                helperText={descriptionError}
                                onBlur={(e) => handleDescriptionError(e.target.value)}
                                id="description"
                                label="توضیحات"
                                multiline
                                minRows={3}
                                value={description}
                                onChange={e => {
                                    setDescription(e.target.value);
                                    handleDescriptionError(e.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <LoadingButton
                                loading={createRequestLoading}
                                type="submit"
                                variant="contained"
                                fullWidth
                                onClick={handleSubmit}
                            >ارسال درخواست
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert severity={snackbarType} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CreateLeaveRequest;