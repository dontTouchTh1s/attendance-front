import React, {useState} from 'react';

import {
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    InputLabel, MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Api from "../../Api";
import {LocalizationProvider, TimePicker} from '@mui/x-date-pickers-pro';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {AdapterMomentJalaali} from '@mui/x-date-pickers-pro/AdapterMomentJalaali';
import './create-request.css';
import {DatePicker} from "@mui/x-date-pickers-pro";
import moment from "moment-jalaali";

function CreateLeaveRequest() {
    const [type, setType] = useState('');
    const [dateRange, setDateRange] = useState([
        moment(),
        moment().add(1, 'days'),
    ]);
    const [hourRange, setHourRange] = useState([
        moment(),
        moment()
    ]);
    const [description, setDescription] = useState('');
    const [leaveTimingType, setLeaveTimingType] = useState('');

    function convertDate(date: Array, format: string) {
        return date.map((date) => date.format(format))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append('type', 'leave');
        formData.append('leave_type', type);
        formData.append('dates', JSON.stringify(convertDate(dateRange, 'YYYY:MM:DD')));
        formData.append('description', description);
        if (leaveTimingType === 'hourly') {
            formData.append('hours', JSON.stringify(convertDate(hourRange, 'HH:mm')));
        }
        for (const value of formData.values()) {
            console.log(value)
        }


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

    // console.log(hourRange)
    let hourPickerDisplay = leaveTimingType === 'hourly' ? '' : 'hidden';
    let dateRangePicker = leaveTimingType === 'daily' ? '' : 'hidden';

    function handleUpdateHourRange(newValue, index) {
        let newHourRange = hourRange.map((hour) => {
            let currentValueIndex = hourRange.indexOf(hour);
            if (currentValueIndex === index) {
                return newValue;
            }
            return hour;
        });
        setHourRange(newHourRange);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
            <Container component={"main"} maxWidth={"xs"}>
                <CssBaseline/>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography component="h1" variant="h4">
                        ارسال درخواست مرخصی
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Box sx={{
                            display: 'flex',
                            marginTop: '8px',
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
                                    onChange={(newValue) => setDateRange([newValue])}
                                    fullWidth
                                    label="تاریخ"
                                    name="date"
                                    id="date">
                                </DatePicker>
                                <TimePicker
                                    label="از ساعت"
                                    value={hourRange[0]}
                                    maxTime={hourRange[1]}

                                    onChange={(newValue) => handleUpdateHourRange(newValue, 0)}
                                />
                                <TimePicker
                                    label="تا ساعت"
                                    value={hourRange[1]}
                                    minTime={hourRange[0]}
                                    onChange={(newValue) => handleUpdateHourRange(newValue, 1)}
                                />
                            </FormControl>
                            <DateRangePicker
                                className={dateRangePicker + " form-control"}
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                value={dateRange}
                                onChange={(newValue) => setDateRange(newValue)}
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
                        >ورود
                        </Button>
                    </Box>
                </Box>
            </Container>
        </LocalizationProvider>
    );
}

export default CreateLeaveRequest;