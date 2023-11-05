import React, {useState} from 'react';
import {
    Box,
    Container,
    FormControl, FormHelperText, InputAdornment,
    InputLabel,
    MenuItem,
    Select, Snackbar,
    TextField,
    Typography,
    FormControlLabel, Checkbox
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Api from "../../Api";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";
import LoadingCircle from "../../Components/LoadingCircle";
import useGroupPolicies from "../../Hooks/useGroupPolicies";


function CreatePenaltyCondition() {
    const {groupPolicies, groupPoliciesError, groupPoliciesIsLoading} = useGroupPolicies();
    const [type, setType] = useState('delay');
    const [duration, setDuration] = useState('');
    const [penalty, setPenalty] = useState('');
    const [groupPolicy, setGroupPolicy] = useState('');
    const [penaltyType, setPenaltyType] = useState('paid');
    const [penaltyIfNoLeaveRemains, setPenaltyIfNoLeaveRemains] = useState(true);
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
            'group_policy_id': groupPolicy,
            'penalty_type': penaltyType,
            'penalty_if_no_leave_remains': penaltyIfNoLeaveRemains
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
                                {
                                    groupPoliciesError ?
                                        <Box sx={{py: 1, px: 2}}>
                                            <Typography component={'span'} variant={'body1'} color={'red'}>
                                                {'خطا در هنگام بارگیری!'}
                                            </Typography>
                                        </Box> :
                                        !groupPoliciesIsLoading ?
                                            groupPolicies.map(gp =>
                                                <MenuItem key={gp.id} value={gp.id}>{gp.name}</MenuItem>
                                            ) : <LoadingCircle message={'در حال بارگذاری'} size={32}/>
                                }
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
                    <Grid sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="penalty-type-label">نوع جریمه</InputLabel>
                            <Select
                                autoWidth
                                labelId="penalty-type-label"
                                value={penaltyType}
                                onChange={(e) => setPenaltyType(e.target.value)}
                                label="نوع جریمه"
                            >
                                <MenuItem value={'noPaid'}>{'مرخصی بدون حقوق'}</MenuItem>
                                <MenuItem value={'paid'}>{'مرخصی استحقاقی'}</MenuItem>
                            </Select>
                            {
                                penaltyType === 'paid' ?
                                    <FormControlLabel
                                        label={'جریمه کردن بدون حقوق در صورت نداشتن مرخصی باقیمانده'}
                                        control={
                                            <Checkbox
                                                checked={penaltyIfNoLeaveRemains}
                                                onChange={(e) => {
                                                    setPenaltyIfNoLeaveRemains(e.target.checked)
                                                }}
                                            />}
                                    >
                                    </FormControlLabel>
                                    : ''
                            }
                        </FormControl>
                    </Grid>
                    <Grid xs={12} container>
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