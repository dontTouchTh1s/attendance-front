import React, {useEffect, useState} from 'react';

import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Api from "../../Api";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers-pro";
import {AdapterMomentJalaali} from "@mui/x-date-pickers-pro/AdapterMomentJalaali";
import moment from "moment-jalaali";


function CreateGroupPolicy() {
    const [name, setName] = useState('');
    const [maxLeaveMonth, setMaxLeaveMonth] = useState('');
    const [maxLeaveYear, setMaxLeaveYear] = useState('');
    const [workStartHour, setWorkStartHour] = useState(moment('2022-04-17T07:00'));
    const [workEndHour, setWorkEndHour] = useState(moment('2022-04-17T15:00'));
    const [workPlace, setWorkPlace] = useState('');
    const [workPlaces, setWorkPlaces] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            'name': name,
            'max_leave_month': maxLeaveMonth,
            'max_leave_year': maxLeaveYear,
            'work_start_hour': workStartHour.format('HH:mm:ss'),
            'work_end_hour': workEndHour.format('HH:mm:ss'),
            'work_place_id': workPlace
        };
        try {
            const response = await Api.post('/group-policies/create', data);
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

    useEffect(() => {
        fetchWorkPlaces();
    }, [])

    async function fetchWorkPlaces() {
        try {
            const response = await Api.get('/work-places');
            // handle successful response
            console.log(response);
            setWorkPlaces(response.data);

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
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name={'name'}
                                placeholder={'نام'}
                                label={'نام سیاست کاری'}
                                autoFocus
                            >
                            </TextField>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="work-place-label">محل کار</InputLabel>
                                <Select
                                    autoWidth
                                    labelId="work-place-label"
                                    value={workPlace}
                                    onChange={(e) => setWorkPlace(e.target.value)}
                                    label="محل کار"
                                >
                                    {workPlaces.map(wp =>
                                        <MenuItem key={wp.id} value={wp.id}>{wp.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <TextField
                                fullWidth
                                value={maxLeaveMonth}
                                onChange={(e) => setMaxLeaveMonth(e.target.value)}
                                name={'max-leave-month'}
                                placeholder={'زمان به دقیقه'}
                                helperText={'زمان به دقیقه'}
                                label={'حداکثر مرخصی در ماه'}
                                type={'number'}
                            >
                            </TextField>
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <TextField
                                fullWidth
                                value={maxLeaveYear}
                                onChange={(e) => setMaxLeaveYear(e.target.value)}
                                name={'max-leave-year'}
                                placeholder={'زمان به دقیقه'}
                                helperText={'زمان به دقیقه'}
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
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                fullWidth
                                onClick={handleSubmit}
                            >ایجاد
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider>
        </Box>
    );
}

export default CreateGroupPolicy;