import React, {useRef, useState} from 'react'
import Api from "../../Api";
import {Box, InputAdornment, Snackbar, TextField, Typography,} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";
import Guide from "../../Components/UserGuide/Guide";
import Map from "../../Components/Map/Map";

const defaultLocation = {lat: 32.6539, lng: 51.6660};

function CreateWorkPlace() {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [radius, setRadius] = useState(0);

    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [radiusError, setRadiusError] = useState('');
    const [createWorkPlaceLoading, setCreateWorkPlaceLoading] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState({
        open: false,
        type: 'error',
        message: ''
    });

    const location = useRef(defaultLocation);

    async function handleSubmitWorkPlace() {
        // Insert new work place to database
        if (handleFormError())
            return;
        let data = {
            'name': name,
            'address': address,
            'radius': radius,
            'lat': location.lat,
            'lng': location.lng
        }

        try {
            setCreateWorkPlaceLoading(true);
            let response = await Api.post('/work-places/create', {...data});
            setCreateWorkPlaceLoading(false);
            console.log(response)
            if (response.status === 201) {
                setSnackbarStatus({
                    open: true,
                    type: 'success',
                    message: 'محل کار با موفقیت اضافه شد.'
                });
            }
            // handle successful response
        } catch (error) {
            setCreateWorkPlaceLoading(false);
            setSnackbarStatus({
                open: true,
                type: 'error',
                message: 'در هنگام ثبت اطلاعات مشکلی پیش آمده است.'
            });
        }

    }

    function handleFormError() {
        let error = false;
        if (handleRadiusError(radius)) error = true;
        if (handleNameError(name)) error = true;
        if (handleAddressError(address)) error = true;
        return error;
    }

    function handleRadiusError(value) {
        const regex = new RegExp('^\\d+$');
        if (regex.test(value) && value !== 0) {
            setRadiusError('');
            return false;
        } else {
            setRadiusError('لطفا شعاع معتبر وارد کنید.');
            return true;
        }
    }

    function handleNameError(value) {
        if (value === '') {
            setNameError('لطفا این فیلد را پر کنید.');
            return true;
        } else {
            setNameError('');
            return false;
        }
    }

    function handleAddressError(value) {
        if (value === '') {
            setAddressError('لطفا این فیلد را پر کنید.');
            return true;
        } else {
            setAddressError('');
            return false;
        }
    }

    function handleSnackBarClose(e, reason) {
        if (reason === 'clickaway')
            return;
        setSnackbarStatus({...snackbarStatus, open: false});
    }

    return (
        <Box>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                محل کار
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                برای اضافه کردن محل کار جدید، مکان آن روی نقشه را به صورت دقیق انتخاب کنید و شعاع مساحت محل کار را به
                صورت تقریبی وارد کنید.
            </Typography>
            <Box sx={{p: {xs: 1, md: 2}}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid xs={12} md={5}>
                        <Box>
                            <Grid container spacing={{xs: 2, md: 3}}>
                                <Grid xs={12}>
                                    <TextField
                                        onBlur={(e) => handleNameError(e.target.value)}
                                        helperText={nameError}
                                        error={nameError !== ''}
                                        autoFocus
                                        fullWidth
                                        label={'نام'}
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value);
                                            handleNameError(e.target.value);
                                        }}
                                    >
                                    </TextField>
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        onBlur={(e) => handleAddressError(e.target.value)} helperText={addressError}
                                        error={addressError !== ''}
                                        label={'آدرس'}
                                        value={address}
                                        fullWidth
                                        onChange={e => {
                                            setAddress(e.target.value);
                                            handleAddressError(e.target.value);
                                        }}
                                        multiline
                                        minRows={4}
                                    >
                                    </TextField>
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        onBlur={(e) => handleRadiusError(e.target.value)}
                                        error={radiusError !== ''}
                                        helperText={radiusError}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">متر</InputAdornment>,
                                        }}
                                        label={'شعاع'}
                                        value={radius}
                                        onChange={e => {
                                            setRadius(e.target.value);
                                            handleRadiusError(e.target.value);
                                        }}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={7}>
                        <Map locationRef={location}/>
                    </Grid>
                    <Grid xs={12} md={5}>
                        <LoadingButton
                            loading={createWorkPlaceLoading}
                            fullWidth
                            variant="contained"
                            onClick={handleSubmitWorkPlace}
                        >
                            ثبت
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={snackbarStatus.open}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert severity={snackbarStatus.type} sx={{width: '100%'}}>
                    {snackbarStatus.message}
                </Alert>
            </Snackbar>
            <Guide
                poses={{right: '50%', top: '50%'}}
                guidesName={'workPlaceGuide'}>
                {
                    [
                        <Typography key={0}>
                            اولین قدیم برای شروع مدیریت، مشخص کردن محل کار است، موقعیت محل کار را از نقشه انتخاب کنید و
                            یک محل کار جدید اضافه کنید.
                        </Typography>,
                    ]
                }
            </Guide>
        </Box>
    )
}

export default CreateWorkPlace