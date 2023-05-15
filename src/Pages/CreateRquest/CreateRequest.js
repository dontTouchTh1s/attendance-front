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
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {AdapterMomentJalaali} from '@mui/x-date-pickers-pro/AdapterMomentJalaali';
import dayjs from "dayjs";


function CreateLeaveRequest() {
    const [type, setType] = useState(0);
    const [dateRange, setDateRange] = useState([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
    ]);
    const [description, setDescription] = useState();


    async function handleSubmit(e) {
        e.preventDefault();


        let formData = new FormData();
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
                                    <MenuItem value={0}>استحقاقی</MenuItem>
                                    <MenuItem value={1}>استعلاحی</MenuItem>
                                    <MenuItem value={2}>بدون حقوق</MenuItem>
                                </Select>
                            </FormControl>

                            <DateRangePicker
                                localeText={{start: 'از تاریخ', end: 'تا تاریخ'}}
                                value={dateRange}
                                onChange={(newValue) => setDateRange(newValue)}
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