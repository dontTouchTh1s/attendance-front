import React, {useState} from 'react';
import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import axios from "axios";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);


        axios.defaults.withCredentials = true;
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        try {
            const response = await axios.post('http://localhost:8000/api/login', formData);
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
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline/>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h4">
                    ورود
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
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
                        value={email}
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
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
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
    );
}

export default Login;