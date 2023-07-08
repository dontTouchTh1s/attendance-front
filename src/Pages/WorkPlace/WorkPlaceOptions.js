import GoogleMap from "../../Map/GoogleMap";
import React, {useState} from 'react'
import Api from "../../Api";
import {
    Box,
    Button,
    Container,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
function WorkPlaceOptions(){
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [radius, setRadius] = useState(0);
    async function handleSubmitWorkPlace(e){
        e.preventDefault();
        // Insert new work place to database
        let formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('radius', radius);
        formData.append('lat', lat);
        formData.append('lng', lng);



        try {
            const response = await Api.post('/work-place/create', formData);
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
    function handleChangeLocation(lat, lng){
        setLat(lat);
        setLng(lng);
    }
    return (
        <Container component={"main"} maxWidth={"xs"}>
            <Box component={'form'} noValidate onSubmit={handleSubmitWorkPlace}>
                <Box sx={{
                    display: 'flex',
                    marginTop: '8px',
                    gap: '12px',
                    flexDirection: 'column',
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
                    >
                    </TextField>
                    <TextField
                        label={'شعاع'}
                        value={radius}
                        onChange={newValue => setRadius(newValue.target.value)}
                    >
                    </TextField>

                    <GoogleMap
                        onChangeLocation={handleChangeLocation}>

                    </GoogleMap>
                    <Button
                        type={'submit'}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                    ثبت
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default WorkPlaceOptions