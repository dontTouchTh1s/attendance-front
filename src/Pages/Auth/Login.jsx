import React, {useContext, useEffect, useState} from 'react';
import {Box, Container, CssBaseline, InputAdornment, Snackbar, TextField, Typography} from "@mui/material";
import Api from "../../Api";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert} from "@mui/lab";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (handleFormError())
            return;

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            setLoginLoading(true);
            const response = await Api.post('/auth/login', formData);
            setLoginLoading(false);
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
            setLoginLoading(false);
            setSnackbarOpen(true);
            if (error.response.status === 401) {
                setSnackbarMessage('نام کاربری یا رمز عبور صحیح نمی باشد.');
            } else {
                setSnackbarMessage('در هنگام دریافت اطلاعات مشکلی پیش آمده است.');
            }
        }
    }

    function handleFormError() {
        let error = false;
        if (handleEmailError(email)) error = true;
        if (handlePasswordError(password)) error = true;

        return error;
    }

    function handleEmailError(value) {
        const regex = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
        if (!regex.test(value)) {
            setEmailError(true);
            setEmailErrorText('یک ایمیل معتبر وارد کنید.');
            return true;
        } else {
            setEmailError(false);
            setEmailErrorText('');
            return false;
        }
    }

    function handlePasswordError(value) {
        if (value.length < 8) {
            setPasswordError(true);
            setPasswordErrorText('رمز عبور حداقل 8 کاراکتر است.');
            return true;
        } else {
            setPasswordError(false);
            setPasswordErrorText('');
            return false;
        }
    }

    function handleSnackBarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    }

    return (
        <Box>
            <CssBaseline/>
            <Typography component="h1" variant="h4" sx={{textAlign: 'center'}}>
                ورود
            </Typography>
            <Container disableGutters maxWidth={'xs'} sx={{p: {xs: 1, md: 2}}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid xs={12}>
                        <TextField
                            type="email"
                            onBlur={(e) => handleEmailError(e.target.value)}
                            error={emailError}
                            helperText={emailErrorText}
                            required
                            fullWidth
                            label="ایمیل"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleEmailError(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            onBlur={(e) => handlePasswordError(e.target.value)}
                            helperText={passwordErrorText}
                            error={passwordError}
                            required
                            fullWidth
                            label="رمز عبور"
                            type={showPassword ? 'test' : 'password'}
                            autoComplete="current-password"
                            value={password}
                            aria-required
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handlePasswordError(e.target.value);
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <LoadingButton
                            loading={loginLoading}
                            type="submit"
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            <span>
                            ورود
                            </span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert severity="error" sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Login;