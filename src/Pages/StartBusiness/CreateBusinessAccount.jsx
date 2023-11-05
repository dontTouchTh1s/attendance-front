import {Button, Container, InputAdornment, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import '../CreateRquest/create-request.css'
import Guide from "../../Components/UserGuide/Guide";

const CreateBusinessAccount = forwardRef((props, ref) => {
    const {initialValues, onChange} = props;
    const [email, setEmail] = useState(initialValues.email);
    const [password, setPassword] = useState(initialValues.password);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState(initialValues.firstName);
    const [lastName, setLastName] = useState(initialValues.lastName);

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [loginPage, setLoginPage] = useState(initialValues.login);

    const guidesRef = useRef([]);

    useImperativeHandle(ref, () => ({
        checkErrors() {
            return handleFormError();
        }
    }));


    function handleFormError() {
        let error = false;
        if (handleEmailError(email)) error = true;
        if (handlePasswordError(password)) error = true;
        if (!loginPage) {
            if (handleConfirmPasswordError(confirmPassword)) error = true;
            if (handleFirstNameError(firstName)) error = true;
            if (handleLastNameError(lastName)) error = true;
        }


        return error;
    }

    function handleEmailError(value) {
        const regex = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
        if (!regex.test(value)) {
            setEmailError('یک ایمیل معتبر وارد کنید.');
            return true;
        } else {
            setEmailError('');
            return false;
        }
    }

    function handlePasswordError(value) {
        if (value.length < 8) {
            setPasswordError('رمز عبور حداقل 8 کاراکتر است.');
            return true;
        } else {
            setPasswordError('');
            return false;
        }
    }

    function handleConfirmPasswordError(value, typing = false) {
        if (typing) {
            if (!password.includes(value)) {
                setConfirmPasswordError('مقدار وارد شده با رمز عبور مطابقت ندارد.');
                return true;

            } else {
                setConfirmPasswordError('');
                return false;
            }
        }
        if (password !== value) {
            setConfirmPasswordError('مقدار وارد شده با رمز عبور مطابقت ندارد.');
            return true;

        } else {
            setConfirmPasswordError('');
            return false;
        }

    }

    function handleFirstNameError(value) {
        let regex = /^[\u0600-\u06FF\s]+$/;
        if (!regex.test(value)) {
            setNameError('لطفا یک نام معتبر وارد کنید.');
            return true;
        } else {
            setNameError('');
            return false;
        }
    }

    function handleLastNameError(value) {
        let regex = /^[\u0600-\u06FF\s]+$/;
        if (!regex.test(value)) {
            setLastNameError('لطفا یک نام خانوادگی معتبر وارد کنید.');
            return true;
        } else {
            setLastNameError('');
            return false;
        }
    }

    const hideOnLoginStyle = 'not-hidden ' + (loginPage ? 'hidden' : '');
    return (
        <>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در مرحله اول یک حساب کاربری در سامانه ایجاد کنید. پس از وارد کردن اطلاعت روی بعدی کلیک کنید.
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در صورتی که قبلا حساب کاربری ساختید، میتوانید وارد آن شوید.
            </Typography>
            <Container disableGutters sx={{py: {xs: 1, sm: 2}}}
                       maxWidth={'xs'}>

                <Typography component='h6' variant='h6' sx={{marginTop: '8px'}} textAlign={'center'}>
                    {loginPage ? 'ورود' : 'ساخت حساب'}
                </Typography>
                <Grid container spacing={{xs: 2, md: 3}} sx={{mt: 2}}>
                    <Grid xs={6} className={hideOnLoginStyle}>
                        <TextField
                            ref={(el) => (guidesRef.current[0] = el)}
                            onBlur={(e) => handleFirstNameError(e.target.value)}
                            required
                            error={nameError !== ''}
                            helperText={nameError}
                            fullWidth
                            label="نام"
                            autoComplete="given-name"
                            autoFocus
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                onChange({firstName: e.target.value});
                                handleFirstNameError(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={6} className={hideOnLoginStyle}>
                        <TextField
                            ref={(el) => (guidesRef.current[1] = el)}
                            required
                            onBlur={(e) => handleLastNameError(e.target.value)}
                            error={lastNameError !== ''}
                            helperText={lastNameError}
                            fullWidth
                            label="نام خانوادگی"
                            value={lastName}
                            autoComplete="family-name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                                onChange({lastName: e.target.value});
                                handleLastNameError(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            type="email"
                            onBlur={(e) => handleEmailError(e.target.value)}
                            error={emailError !== ''}
                            helperText={emailError}
                            required
                            fullWidth
                            label="ایمیل"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                onChange({email: e.target.value});
                                handleEmailError(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            onBlur={(e) => handlePasswordError(e.target.value)}
                            helperText={passwordError}
                            error={passwordError !== ''}
                            required
                            fullWidth
                            label="رمز عبور"
                            type={showPassword ? 'test' : 'password'}
                            autoComplete="current-password"
                            value={password}
                            aria-required
                            onChange={(e) => {
                                setPassword(e.target.value);
                                onChange({password: e.target.value});
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
                    <Grid xs={12} className={hideOnLoginStyle}>
                        <TextField
                            onBlur={(e) => handleConfirmPasswordError(e.target.value)}
                            helperText={confirmPasswordError}
                            error={confirmPasswordError !== ''}
                            required
                            fullWidth
                            label="تکرار رمز عبور"
                            type={showPassword ? 'test' : 'password'}
                            autoComplete="current-password"
                            value={confirmPassword}
                            aria-required
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                handleConfirmPasswordError(e.target.value, true);
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
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        {
                            !loginPage ?
                                <Button variant={'text'} onClick={() => {
                                    setLoginPage(true)
                                    onChange({login: true})
                                }}>
                                    حساب کاربری دارم
                                </Button>
                                :
                                <Button variant={'text'} onClick={() => {
                                    setLoginPage(false)
                                    onChange({login: false})
                                }}>
                                    ساخت حساب کاربری
                                </Button>
                        }
                    </Grid>
                </Grid>
            </Container>
            <Guide
                refs={guidesRef}
                guidesName={'cbaGuides'}>
                {
                    [
                        <Typography key={0}>
                            برای فلان کار کردن میتوانید فلان کار را بکنید1.
                        </Typography>,
                        <Typography key={1}>
                            برای فلان کار کردن میتوانید فلان کار را بکنید2.
                        </Typography>,

                    ]
                }
            </Guide>
        </>
    );
})

export default CreateBusinessAccount;