import React, {useState} from 'react';
import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import Api from "../../Api";
import {useNavigate} from "react-router-dom";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);


        try {
            const response = await Api.post('/auth/login', formData);

            if (response.status === 200) {
                navigate('/panel');
                // handle successful response
                localStorage.setItem('name', response.data['name']);
                localStorage.setItem('email', response.data['email']);
                let location = JSON.parse(response.data['workPlace']['location']);
                localStorage.setItem('lat', location['lat']);
                localStorage.setItem('lng', location['lng']);
                localStorage.setItem('radius', response.data['workPlace']['radius']);
            }
        } catch (error) {

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
                        onClick={handleSubmit}
                    >ورود
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;