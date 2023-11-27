import GoogleMap from "../../Components/Map/GoogleMap";
import React, {useRef, useState} from 'react'
import Api from "../../Api";
import {Box, Container, InputAdornment, Snackbar, TextField, Typography,} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";
import Guide from "../../Components/UserGuide/Guide";

const defaultLocation = {lat: 32.6539, lng: 51.6660};
const defaultZoom = 10;

function CreateWorkPlace() {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [radius, setRadius] = useState(0);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(defaultZoom);
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [radiusError, setRadiusError] = useState('');
    const [createWorkPlaceLoading, setCreateWorkPlaceLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarType, setSnackbarType] = useState('error');
    const [snackbarMessage, setSnackbarMessage] = useState('');

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
                setSnackbarOpen(true);
                setSnackbarType('success');
                setSnackbarMessage('محل کار با موفقیت اضافه شد.');
            }
            // handle successful response
        } catch (error) {
            setCreateWorkPlaceLoading(false);
            setSnackbarOpen(true);
            setSnackbarType('error');
            setSnackbarMessage('در هنگام ثبت اطلاعات مشکلی پیش آمده است.');
        }

    }


    function handleChangeLocation(lat, lng) {
        setLocation({lat: lat, lng: lng});
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
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
        setSnackbarOpen(false);
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
                        <GoogleMap
                            defaultLocation={location}
                            zoom={zoom}
                            mapTypeId="roadmap"
                            style={{height: '700px'}}
                            onChangeLocation={handleChangeLocation}
                            onChangeZoom={handleChangeZoom}
                            apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>
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
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert severity={snackbarType} sx={{width: '100%'}}>
                    {snackbarMessage}
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
                        <Typography key={1}>
                            برای فلان کار کردن میتوانید فلان کار را بکنید2.
                        </Typography>,
                        <Typography key={2}>
                            برای فلان کار کردن میتوانید فلان کار را بکنید2.
                        </Typography>,
                        <Typography key={3}>
                            برای فلان کار کردن میتوانید فلان کار را بکنید2.
                        </Typography>,

                    ]
                }
            </Guide>
        </Box>
    )
}

export default CreateWorkPlace