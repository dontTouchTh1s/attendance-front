import React, {useState} from 'react';

import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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

function CreateLeaveRequest() {
    const [type, setType] = useState('');
    const [dateRange, setDateRange] = useState([
        moment(),
        moment().add(1, 'days'),
    ]);
    //
    const [fromHour, setFromHour] = useState(moment('2022-04-17T15:30'));
    const [toHour, setToHour] = useState(moment('2022-04-17T15:30'));
    const [description, setDescription] = useState('');
    const [leaveTimingType, setLeaveTimingType] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();
        let fromDate = moment(dateRange[0]);
        let toDate = leaveTimingType === 'hourly' ? fromDate.add(1, 'days') : dateRange[1];
        let data = {
            'type': 'leave',
            'leave_type': type,
            'from_date': dateRange[0].format('jYYYY-jMM-jDD'),
            'to_date': toDate.format('jYYYY-jMM-jDD'),
            'description': description
        };

        if (leaveTimingType === 'hourly') {
            data.from_hour = fromHour.format('HH:mm:ss');
            data.to_hour = toHour.format('HH:mm:ss');
        }


        try {
            const response = await Api.post('/requests/create', data);
            // handle successful response
        } catch (error) {
            console.log(error)
        }

    }

    let hourPickerDisplay = leaveTimingType === 'hourly' ? '' : 'hidden';
    let dateRangePicker = leaveTimingType === 'daily' ? '' : 'hidden';

    function handleDateRangeChange(dateRage) {
        setDateRange(dateRage)
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
                <Container disableGutters maxWidth={'md'} component={'main'} sx={{p: {xs: 2, md: 3}}}>
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
                              className={hourPickerDisplay + " form-control"}>
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
                                    value={toHour}
                                    onChange={(newValue) => setToHour(newValue)}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <DateRangePicker
                                className={dateRangePicker + " form-control"}
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                value={dateRange}
                                onChange={handleDateRangeChange}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                id="description"
                                label="توضیحات"
                                multiline
                                minRows={3}
                                value={description}
                                onChange={newValue => setDescription(newValue.target.value)}
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                fullWidth
                                onClick={handleSubmit}
                            >ارسال درخواست
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider>
        </Box>
    );
}

export default CreateLeaveRequest;