import React, {useState} from 'react';

import {
    Box,
    Button,
    Container,
    CssBaseline,
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
import dayjs from "dayjs";
import './create-request.css';
import moment from "moment-jalaali";

function CreateLeaveRequest() {
    const [type, setType] = useState('');
    const [dateRange, setDateRange] = useState([
        moment(),
        moment().add(1, 'days'),
    ]);
    //
    const [fromHour, setFromHour] = useState(dayjs('2022-04-17T15:30'));
    const [toHour, setToHour] = useState(dayjs('2022-04-17T15:30'));
    const [description, setDescription] = useState('');
    const [leaveTimingType, setLeaveTimingType] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append('type', 'leave');
        formData.append('leave_type', type);
        formData.append('from_date', dateRange[0].getDate());
        formData.append('to_date', dateRange[1].getDate());
        formData.append('description', description);
        if (leaveTimingType === 1) {
            formData.append('from_hour', (fromHour.format('HH-mm-ss')));
            formData.append('to_hour', (toHour.format('HH-mm-ss')));
        }
        for (const value of formData.values())
            console.log(value);


        try {
            const response = await Api.post('/requests/create', formData);
            // handle successful response
            console.log(response);
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

    let hourPickerDisplay = leaveTimingType === 'hourly' ? '' : 'hidden';
    let dateRangePicker = leaveTimingType === 'daily' ? '' : 'hidden';

    function handleDateRangeChange(dateRage) {
        dateRage.map(date => date.getDay);
        setDateRange(dateRage)
    }

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                <CssBaseline/>
                <Typography component="h1" variant="h4">
                    ارسال درخواست مرخصی
                </Typography>
                <Typography component='p' sx={{marginTop: '8px'}}>
                    برای ارسال درخواست مرخصی ابتدا نوع و زمان آن را مشخص کنید، سپس با نوشتن توضیحات آن را ارسال کنید.
                </Typography>
                <Container component={'main'} maxWidth={'sm'}>

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Box sx={{
                            display: 'flex',
                            padding: '16px 0',
                            gap: '12px',
                            flexDirection: 'column',
                        }}>
                            <FormControl sx={{
                                width: '100%',
                            }}>
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
                                    <MenuItem value={'noPaid'}>بدون حقوق</MenuItem>
                                    <MenuItem value={'optional'}>انتخابی</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl
                                sx={{
                                    width: '100%',
                                }}>
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
                            <FormControl className={hourPickerDisplay + " form-control"}
                                         sx={{
                                             display: 'flex',
                                             gap: '12px'
                                         }}>
                                <DatePicker
                                    value={dateRange[0]}
                                    onChange={(newValue) => setDateRange([newValue, newValue])}
                                    fullWidth
                                    label="تاریخ"
                                    name="date"
                                    id="date">
                                </DatePicker>
                                <TimePicker
                                    label="از ساعت"
                                    value={fromHour}
                                    onChange={(newValue) => setFromHour(newValue)}
                                />
                                <TimePicker
                                    label="تا ساعت"
                                    value={toHour}
                                    onChange={(newValue) => setToHour(newValue)}
                                />
                            </FormControl>
                            <DateRangePicker
                                className={dateRangePicker + " form-control"}
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                value={dateRange}
                                onChange={handleDateRangeChange}
                            />

                            <TextField
                                id="description"
                                label="توضیحات"
                                multiline
                                value={description}
                                onChange={newValue => setDescription(newValue.target.value)}
                            />

                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            fullWidth
                        >ارسال درخواست
                        </Button>
                    </Box>
                </Container>
            </LocalizationProvider>
        </Box>
    );
}

export default CreateLeaveRequest;