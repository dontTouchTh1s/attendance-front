import React, {useContext, useEffect, useState} from 'react';

import {
    Box,
    Button,
    Container,
    FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Api from "../../Api";
import UserContext from "../../Contexts/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";

function CreatePenaltyCondition() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [groupPolicy, setGroupPolicy] = useState('');
    const [manager, setManager] = useState('');
    const [groupPolicies, setGroupPolicies] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [roll, setRoll] = useState('employee');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [groupPolicyError, setGroupPolicyError] = useState('');
    const [createEmployeeLoading, setCreateEmployeeLoading] = useState(false);

    const user = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();
        handleEmailError(email);
        handleFirstNameError(firstName);
        handleLastNameError(lastName);
        handlePasswordError(password)
        handleGroupPolicyError(groupPolicy);
        if (emailError || firstNameError || lastNameError || passwordError || groupPolicyError) {
            return;
        }
        let data = {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password,
            'manager_id': manager,
            'group_policy_id': groupPolicy
        };
        if (roll !== '')
            data.roll = roll;
        try {
            setCreateEmployeeLoading(true);
            await Api.post('/employees/create', data);
            setCreateEmployeeLoading(false);
            // handle successful response
        } catch (error) {
            setCreateEmployeeLoading(false);
        }

    }

    useEffect(() => {
        fetchGroupPolicies();
        fetchEmployees();
    }, [])

    async function fetchGroupPolicies() {
        try {
            const response = await Api.get('/group-policies');
            // handle successful response
            setGroupPolicies(response.data);

        } catch (error) {

        }
    }

    async function fetchEmployees() {
        try {
            const response = await Api.get('/employees');
            // handle successful response
            setEmployees(response.data.data);

        } catch (error) {

        }
    }

    function handleEmailError(value) {
        const regex = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
        if (!regex.test(value)) {
            setEmailError('لطفا یک ایمیل معتبر وارد کنید.');
        } else {
            setEmailError('');
        }
    }

    function handleFirstNameError(value) {
        let regex = /^[\u0600-\u06FF\s]+$/;
        if (!regex.test(value)) {
            setFirstNameError('لطفا یک نام معتبر وارد کنید.');
        } else {
            setFirstNameError('');
        }
    }

    function handleLastNameError(value) {
        let regex = /^[\u0600-\u06FF\s]+$/;
        if (!regex.test(value)) {
            setLastNameError('لطفا یک نام خانوادگی معتبر وارد کنید.');
        } else {
            setLastNameError('');
        }
    }

    function handlePasswordError(value) {
        if (value.length < 8) {
            setPasswordError('رمز عبور حداقل 8 باید باشد.');
        } else {
            setPasswordError('');
        }
    }

    function handleGroupPolicyError(value) {
        if (value === '')
            setGroupPolicyError('لطفا یک گروه سیاست کاری انتخاب کنید.');
        else
            setGroupPolicyError('');
    }

    return (
        <Box>
            <Typography component="h1" variant="h4">
                اضافه کردن کارمنده
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید کارمند جدید به سامانه اضافه کنید. برای این کار سیاست کاری، و سرپرست مربوطه را مشخص
                کنید.

            </Typography>
            <Container disableGutters maxWidth={'md'} component={'main'} sx={{p: {xs: 2, md: 3}}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            error={firstNameError !== ''}
                            helperText={firstNameError}
                            value={firstName}
                            onBlur={(e) => handleFirstNameError(e.target.value)}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                handleFirstNameError(e.target.value)
                            }}
                            placeholder={'نام'}
                            label={'نام'}
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            error={lastNameError !== ''}
                            helperText={lastNameError}
                            fullWidth
                            value={lastName}
                            onBlur={(e) => handleLastNameError(e.target.value)}
                            onChange={(e) => {
                                setLastName(e.target.value)
                                handleLastNameError(e.target.value);
                            }}
                            label={'نام خانوادگی'}
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            error={emailError !== ''}
                            helperText={emailError}
                            fullWidth
                            value={email}
                            onBlur={(e) => handleEmailError(e.target.value)}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleEmailError(e.target.value);
                            }}
                            placeholder={'ایمیل'}
                            label={'ایمیل'}
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            error={passwordError !== ''}
                            helperText={passwordError}
                            fullWidth
                            value={password}
                            onBlur={(e) => handlePasswordError(e.target.value)}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handlePasswordError(e.target.value);
                            }}
                            placeholder={'رمز عبور'}
                            label={'رمز عبور'}
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="group-policy-label">گروه سیاست کاری</InputLabel>
                            <Select
                                error={groupPolicyError !== ''}
                                autoWidth
                                labelId="group-policy-label"
                                value={groupPolicy}
                                onBlur={(e) => handleGroupPolicyError(e.target.value)}
                                onChange={(e) => {
                                    setGroupPolicy(e.target.value);
                                    handleGroupPolicyError(e.target.value);
                                }}
                                label="گروه سیاست کاری"
                                required
                            >
                                {groupPolicies.map(gp =>
                                    <MenuItem key={gp.id} value={gp.id}>{gp.name}</MenuItem>
                                )}

                            </Select>
                            <FormHelperText error={groupPolicyError !== ''}>{groupPolicyError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="manager-label">سرپرست</InputLabel>
                            <Select
                                autoWidth
                                labelId="manager-label"
                                value={manager}
                                onChange={(e) => setManager(e.target.value)}
                                label="سرپرست"
                            >
                                {employees.map(e =>
                                    <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText>اختیاری</FormHelperText>

                        </FormControl>
                    </Grid>
                    {
                        user.current.navBarUser.roll === 'superAdmin' ?
                            <Grid sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="roll-label">نقش</InputLabel>
                                    <Select
                                        autoWidth
                                        labelId="roll-label"
                                        value={roll}
                                        onChange={(e) => setRoll(e.target.value)}
                                        label="نقش"
                                    >
                                        <MenuItem
                                            value={'expertAdministrativeAffairs'}>{'کارشناس امور اداری'}</MenuItem>
                                        <MenuItem value={'managerAdministrativeAffairs'}>{'مدیر امور اداری'}</MenuItem>
                                        <MenuItem value={'employee'}>{'کارمند'}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid> : null
                    }


                    <Grid xs={12} sm={7}>
                        <LoadingButton
                            loading={createEmployeeLoading}
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            fullWidth
                            onClick={handleSubmit}
                        >ایجاد
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CreatePenaltyCondition;