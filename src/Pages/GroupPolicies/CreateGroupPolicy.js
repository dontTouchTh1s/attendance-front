import React, {useState} from 'react';

import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Api from "../../Api";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers-pro";
import {AdapterMomentJalaali} from "@mui/x-date-pickers-pro/AdapterMomentJalaali";


function CreateGroupPolicy() {
    const [name, setName] = useState('');
    const [maxLeaveMonth, setMaxLeaveMonth] = useState();
    const [maxLeaveYear, setMaxLeaveYear] = useState();
    const [workStartHour, setWorkStartHour] = useState();
    const [workEndHour, setWorkEndHour] = useState();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await Api.post('/requests/create');
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
                    <Grid container spacing={{xs: 1, md: 2}}>
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
                                value={workStartHour}
                                onChange={(newValue) => setWorkStartHour(newValue)}
                                name={'work-start-hour'}
                                placeholder={'ساعت شروع'}
                                label={'ساعت پایان کار کارکنان'}>
                            </TimePicker>
                        </Grid>
                        <Grid sm={4} xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                fullWidth
                            >ورود
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </LocalizationProvider>
        </Box>
    );
}

export default CreateGroupPolicy;