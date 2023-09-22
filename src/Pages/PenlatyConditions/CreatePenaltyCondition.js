import React, {useEffect, useState} from 'react';

import {
    Box,
    Button,
    Container,
    FormControl, FormHelperText, InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Api from "../../Api";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";

function CreatePenaltyCondition() {
    const [type, setType] = useState('delay');
    const [duration, setDuration] = useState('');
    const [penalty, setPenalty] = useState('');
    const [groupPolicy, setGroupPolicy] = useState('');
    const [groupPolicies, setGroupPolicies] = useState([]);
    const [typeTitle, setTypeTitle] = useState('تاخیر');

    const [groupPolicyError, setGroupPolicyError] = useState('');
    const [durationError, setDurationError] = useState('');
    const [penaltyError, setPenaltyError] = useState('');
    const [createPenaltyConditionLoading, setCreatePenaltyConditionLoading] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('error');

    function handleTypeChange(e) {
        setType(e.target.value)

        switch (e.target.value) {
            case 'delay':
                setTypeTitle('تاخیر');
                break;
            case 'cuttingOut':
                setTypeTitle('تاجیل');
                break;
            case 'leaveAttendance':
                setTypeTitle('خروج میان ساعت کاری');
                break;
            default:
                setTypeTitle('');
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (handleFormError())
            return;

        let data = {
            'type': type,
            'duration': duration,
            'penalty': penalty,
            'group_policy_id': groupPolicy
        };
        try {
            setCreatePenaltyConditionLoading(true);
            let response = await Api.post('/penalty-conditions/create', data);
            setCreatePenaltyConditionLoading(false);
            if (response.status === 201) {
                setSnackbarOpen(true)
                setSnackbarMessage('شرط جریمه با موفقیت اضافه شد.');
                setSnackbarType('success');
            }
            // handle successful response
        } catch (error) {
            setCreatePenaltyConditionLoading(false);
            setSnackbarOpen(true)
            setSnackbarMessage('در هنگام ثبت اطلاعات مشکلی پیش آمده است.');
            setSnackbarType('error');
        }

    }

    useEffect(() => {
        fetchGroupPolicies();
    }, [])

    async function fetchGroupPolicies() {
        try {
            const response = await Api.get('/group-policies');
            // handle successful response
            setGroupPolicies(response.data);

        } catch (error) {

        }
    }

    function handleFormError() {
        let error = false;
        if (handleGroupPolicyError(groupPolicy)) error = true;
        if (handleDurationError(duration)) error = true;
        if (handlePenaltyError(penalty)) error = true;
        return error;
    }

    function handleGroupPolicyError(value) {
        if (value === '') {
            setGroupPolicyError('لطفا یک گروه سیاست کاری انتخاب کنید.');
            return true;
        } else {
            setGroupPolicyError('');
            return false;
        }
    }

    function handleDurationError(value) {
        const regex = new RegExp('^\\d+$');
        if (regex.test(value) && duration !== '0') {
            setDurationError('');
            return false;
        } else {
            setDurationError('لطفا عدد معتبر وارد کنید.');
            return true;
        }
    }

    function handlePenaltyError(value) {
        const regex = new RegExp('^\\d+$');
        if (regex.test(value) && penalty !== '0') {
            setPenaltyError('');
            return false;
        } else {
            setPenaltyError('لطفا عدد معتبر وارد کنید.');
            return true;
        }
    }

    function handleSnackBarClose(e, reason) {
        if (reason === 'clickaway')
            return;
        setSnackbarOpen(false);
    }

    return (
        <Box>
            <Typography component="h1" variant="h4">
                ساخت شرط جریمه
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید شرایط جدید برای جریمه شدن کارمندان در صورت تاخیر، تاجیل یا خروج میان کار تعیین کنید.
            </Typography>
            <Container disableGutters maxWidth={'md'} sx={{p: {xs: 1, md: 2}}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="type-label">جریمه برای</InputLabel>
                            <Select
                                autoWidth
                                labelId="type-label"
                                value={type}
                                onChange={handleTypeChange}
                                label="جریمه برای"
                            >
                                <MenuItem value={'delay'}>{'تاخیر'}</MenuItem>
                                <MenuItem value={'cuttingOut'}>{'تاجیل'}</MenuItem>
                                <MenuItem value={'leaveAttendance'}>{'خروج میان ساعت کاری'}</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="group-policy-label">گروه سیاست کاری</InputLabel>
                            <Select
                                error={groupPolicyError !== ''}
                                onBlur={(e) => handleGroupPolicyError(e.target.value)}
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
                            <FormHelperText error={groupPolicyError !== ''}>{groupPolicyError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            error={durationError !== ''}
                            helperText={durationError}
                            onBlur={(e) => handleDurationError(e.target.value)}
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder={'زمان'}
                            label={'مدت زمان ' + typeTitle + ' برای اعمال جریمه'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">دقیقه</InputAdornment>,
                            }}
                            type={'number'}
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            error={penaltyError !== ''}
                            helperText={penaltyError}
                            onBlur={(e) => handlePenaltyError(e.target.value)}
                            value={penalty}
                            onChange={(e) => setPenalty(e.target.value)}
                            placeholder={'زمان'}
                            label={'جریمه'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">دقیقه</InputAdornment>,
                            }}
                            type={'number'}
                        >
                        </TextField>
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
                        <LoadingButton
                            loading={createPenaltyConditionLoading}
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert severity={snackbarType} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CreatePenaltyCondition;