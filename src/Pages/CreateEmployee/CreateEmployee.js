import React, {useContext, useEffect, useState} from 'react';

import {
    Box,
    Button,
    Container,
    FormControl,
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

function CreatePenaltyCondition() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [groupPolicy, setGroupPolicy] = useState('');
    const [manager, setManager] = useState('');
    const [groupPolicies, setGroupPolicies] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [roll, setRoll] = useState('');
    const user = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();
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
            const response = await Api.post('/employees/create', data);
            // handle successful response
        } catch (error) {

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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={'نام'}
                            label={'نام'}
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            label={'نام خانوادگی'}
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={'ایمیل'}
                            label={'ایمیل'}
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={'رمز عبور'}
                            label={'رمز عبور'}
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="group-policy-label">گروه سیاست کاری</InputLabel>
                            <Select
                                autoWidth
                                labelId="group-policy-label"
                                value={groupPolicy}
                                onChange={(e) => setGroupPolicy(e.target.value)}
                                label="گروه سیاست کاری"
                            >
                                {groupPolicies.map(gp =>
                                    <MenuItem key={gp.id} value={gp.id}>{gp.name}</MenuItem>
                                )}

                            </Select>
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
                        </FormControl>
                    </Grid>
                    {
                        user.current.navBarUser().roll === 'superAdmin' ?
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
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            fullWidth
                            onClick={handleSubmit}
                        >ایجاد
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CreatePenaltyCondition;