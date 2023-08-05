import React, {useState} from 'react';
import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import Api from "../../Api";
import {useNavigate} from "react-router-dom";


function SingUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== cPassword)
            return;
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        try {
            Api.post('/auth/register', formData);
            navigate('/login');
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

        // handle successful registration here

    }

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline/>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h4">
                    ثبت نام
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        type="name"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="نام"
                        name="نام"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <TextField
                        type="email"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="ایمیل"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="رمز عبود"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="cPassword"
                        label="تکرار رمز عبور"
                        type="text"
                        id="cPassword"
                        autoComplete="new-password"
                        onChange={(e) => {
                            setCPassword(e.target.value)
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        fullWidth
                        onClick={handleSubmit}
                    >
                        ثبت نام
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SingUp;