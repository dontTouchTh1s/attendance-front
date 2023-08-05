import GoogleMap from "../../Components/Map/GoogleMap";
import React, {useState} from 'react'
import Api from "../../Api";
import {Box, Button, TextField, Typography,} from "@mui/material";

const defaultLocation = {lat: 32.6539, lng: 51.6660};
const defaultZoom = 10;

function CreateWorkPlace() {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [radius, setRadius] = useState(0);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(defaultZoom);


    async function handleSubmitWorkPlace() {
        // Insert new work place to database

        let data = {
            'name': name,
            'address': address,
            'radius': radius,
            'lat': location.lat,
            'lng': location.lng
        }
        try {
            const response = await Api.post('/work-places/create', {...data});
            console.log(response);
            // handle successful response

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


    function handleChangeLocation(lat, lng) {
        setLocation({lat: lat, lng: lng});
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
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
            <Box component={'form'} noValidate onSubmit={handleSubmitWorkPlace}
                 sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     gap: '16px',
                     padding: '16px 0'
                 }}>
                <Box sx={{
                    display: 'flex',
                    gap: '12px',
                    flexDirection: 'column',
                    minWidth: '40%'
                }}>
                    <TextField
                        label={'نام'}
                        value={name}
                        onChange={newValue => setName(newValue.target.value)}
                    >
                    </TextField>
                    <TextField
                        label={'آدرس'}
                        value={address}
                        onChange={newValue => setAddress(newValue.target.value)}
                        multiline
                        minRows={2}
                    >
                    </TextField>
                    <TextField
                        label={'شعاع'}
                        value={radius}
                        onChange={newValue => setRadius(newValue.target.value)}
                    >
                    </TextField>


                    <Button
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmitWorkPlace}
                    >
                        ثبت
                    </Button>
                </Box>
                <Box sx={{width: '100%'}}>
                    <GoogleMap
                        defaultLocation={location}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{height: '700px'}}
                        onChangeLocation={handleChangeLocation}
                        onChangeZoom={handleChangeZoom}
                        apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>

                </Box>
            </Box>
        </Box>
    )
}

export default CreateWorkPlace