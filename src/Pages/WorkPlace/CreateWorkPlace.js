import GoogleMap from "../../Components/Map/GoogleMap";
import React, {useState} from 'react'
import Api from "../../Api";
import {Box, Container, InputAdornment, TextField, Typography,} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";

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

    async function handleSubmitWorkPlace() {
        // Insert new work place to database
        handleRadiusError();
        handleAddressError();
        if (radiusError || addressError || nameError)
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
            await Api.post('/work-places/create', {...data});
            setCreateWorkPlaceLoading(false);

            // handle successful response
        } catch (error) {
            setCreateWorkPlaceLoading(false);
        }

    }


    function handleChangeLocation(lat, lng) {
        setLocation({lat: lat, lng: lng});
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleRadiusError(value) {
        const regex = new RegExp('^\\d+$');
        if (regex.test(value) && value !== '0') {
            setRadiusError('');
        } else {
            setRadiusError('لطفا شعاع معتبر وارد کنید.');
        }
    }

    function handleNameError(value) {
        if (value === '') {
            setNameError('لطفا این فیلد را پر کنید.');
        } else {
            setNameError('');
        }
    }

    function handleAddressError(value) {
        if (value === '') {
            setAddressError('لطفا این فیلد را پر کنید.');
        } else {
            setAddressError('');
        }
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
            <Container disableGutters maxWidth={'xl'} component={'main'} sx={{p: {xs: 2, md: 3}}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid xs={12} md={5}>
                        <Box>
                            <Grid container spacing={{xs: 2, md: 3}}>
                                <Grid xs={12}>
                                    <TextField
                                        onBlur={handleNameError}
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
                                        onBlur={handleAddressError}
                                        helperText={addressError}
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
                                        onBlur={handleRadiusError}
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
            </Container>
        </Box>
    )
}

export default CreateWorkPlace