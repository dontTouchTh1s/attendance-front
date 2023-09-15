import React, {useEffect, useState} from 'react';

import {
    Box,
    Button,
    Container,
    FormControl, FormHelperText, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Api from "../../Api";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers-pro";
import {AdapterMomentJalaali} from "@mui/x-date-pickers-pro/AdapterMomentJalaali";
import moment from "moment-jalaali";
import LoadingButton from "@mui/lab/LoadingButton";


function CreateGroupPolicy() {
    const [name, setName] = useState('');
    const [maxLeaveMonth, setMaxLeaveMonth] = useState('');
    const [maxLeaveYear, setMaxLeaveYear] = useState('');
    const [workStartHour, setWorkStartHour] = useState(moment('2022-04-17T07:00'));
    const [workEndHour, setWorkEndHour] = useState(moment('2022-04-17T15:00'));
    const [workPlace, setWorkPlace] = useState('');
    const [workPlaces, setWorkPlaces] = useState([]);
    const [nameError, setNameError] = useState('');
    const [maxLeaveMonthError, setMaxLeaveMonthError] = useState('');
    const [maxLeaveYearError, setMaxLeaveYearError] = useState('');
    const [workPlaceError, setWorkPlaceError] = useState('');
    const [createGroupPolicyLoading, setCreateGroupPolicyLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        handleMaxLeaveMonthError();
        handleMaxLeaveYearError();
        handleWorkPlaceError();
        if (nameError || maxLeaveYearError || maxLeaveMonthError || workPlaceError)
            return;
        let data = {
            'name': name,
            'max_leave_month': maxLeaveMonth,
            'max_leave_year': maxLeaveYear,
            'work_start_hour': workStartHour.format('HH:mm:ss'),
            'work_end_hour': workEndHour.format('HH:mm:ss'),
            'work_place_id': workPlace
        };
        try {
            setCreateGroupPolicyLoading(true);
            await Api.post('/group-policies/create', data);
            setCreateGroupPolicyLoading(false);
            // handle successful response
        } catch (error) {
            setCreateGroupPolicyLoading(false);
        }

    }

    useEffect(() => {
        fetchWorkPlaces();
    }, [])

    async function fetchWorkPlaces() {
        try {
            const response = await Api.get('/work-places');
            // handle successful response
            setWorkPlaces(response.data);

        } catch (error) {

        }
    }


    function handleNameError(value) {
        if (value === '')
            setNameError('لطفا این فیلد را پر کنید.');
        else
            setNameError('');
    }

    function handleWorkPlaceError(value) {
        if (value === '') {
            setWorkPlaceError('لطفا یک محل کار انتخاب کنید.');
        } else {
            setWorkPlaceError('');
        }
    }

    function handleMaxLeaveMonthError(value) {
        const regex = new RegExp('^\\d+$');
        if (regex.test(value) && value !== '0') {
            setMaxLeaveMonthError('');
        } else {
            setMaxLeaveMonthError('لطفا عدد معتبر وارد کنید.');
        }
    }

    function handleMaxLeaveYearError(value) {
        const regex = new RegExp('^\\d+$');
        if (regex.test(value) && value !== '0') {
            setMaxLeaveYearError('');
        } else {
            setMaxLeaveYearError('لطفا عدد معتبر وارد کنید.');
        }
    }

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>

                <Typography component="h1" variant="h4">
                    ساخت سیاست کاری
                </Typography>
                <Typography component='p' sx={{marginTop: '8px'}}>
                    در این بخش میتوانید سیاست کاری برای گروه های مختلف کارکنان ایجاد کنید.
                </Typography>
                <Container disableGutters maxWidth={'md'} component={'main'} sx={{p: {xs: 2, md: 3}}}>
                    <Grid container spacing={{xs: 2, md: 3}}>
                        <Grid sm={6} xs={12}>
                            <TextField
                                onBlur={handleNameError}
                                error={nameError !== ''}
                                helperText={nameError}
                                fullWidth
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    handleNameError(e.target.value);
                                }}
                                name={'name'}
                                placeholder={'نام'}
                                label={'نام سیاست کاری'}
                                autoFocus
                            >
                            </TextField>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <FormControl
                                fullWidth>
                                <InputLabel id="work-place-label">محل کار</InputLabel>
                                <Select
                                    autoWidth
                                    onBlur={handleWorkPlaceError}
                                    error={workPlaceError !== ''}
                                    labelId="work-place-label"
                                    value={workPlace}
                                    onChange={(e) => {
                                        setWorkPlace(e.target.value);
                                        handleWorkPlaceError(e.target.value);
                                    }}
                                    label="محل کار"
                                >
                                    {workPlaces.map(wp =>
                                        <MenuItem key={wp.id} value={wp.id}>{wp.name}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText error={workPlaceError !== ''}>{workPlaceError}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <TextField
                                fullWidth
                                onBlur={handleMaxLeaveMonthError}
                                error={maxLeaveMonthError !== ''}
                                helperText={maxLeaveMonthError}
                                value={maxLeaveMonth}
                                onChange={(e) => {
                                    setMaxLeaveMonth(e.target.value);
                                    handleMaxLeaveMonthError(e.target.value);
                                }}
                                name={'max-leave-month'}
                                placeholder={'زمان به دقیقه'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">دقیقه</InputAdornment>,
                                }}
                                label={'حداکثر مرخصی در ماه'}
                                type={'number'}
                            >
                            </TextField>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <TextField
                                fullWidth
                                value={maxLeaveYear}
                                onBlur={handleMaxLeaveYearError}
                                error={maxLeaveYearError !== ''}
                                helperText={maxLeaveYearError}
                                onChange={(e) => {
                                    setMaxLeaveYear(e.target.value);
                                    handleMaxLeaveMonthError(e.target.value);
                                }}
                                name={'max-leave-year'}
                                placeholder={'زمان به دقیقه'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">دقیقه</InputAdornment>,
                                }}
                                label={'حداکثر مرخصی در سال'}
                                type={'number'}
                            >
                            </TextField>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <TimePicker
                                sx={{width: '100%'}}
                                value={workStartHour}
                                onChange={(newValue) => setWorkStartHour(newValue)}
                                name={'work-start-hour'}
                                placeholder={'ساعت شروع'}
                                label={'ساعت شروع کار کارکنان'}>
                            </TimePicker>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <TimePicker
                                minTime={workStartHour}
                                sx={{width: '100%'}}
                                value={workEndHour}
                                onChange={(newValue) => setWorkEndHour(newValue)}
                                name={'work-end-hour'}
                                placeholder={'ساعت شروع'}
                                label={'ساعت پایان کار کارکنان'}>
                            </TimePicker>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <LoadingButton
                                loading={createGroupPolicyLoading}
                                variant="contained"
                                type={"submit"}
                                sx={{mt: 3, mb: 2}}
                                fullWidth
                                onClick={handleSubmit}
                            >ایجاد
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider>
        </Box>
    );
}

export default CreateGroupPolicy;