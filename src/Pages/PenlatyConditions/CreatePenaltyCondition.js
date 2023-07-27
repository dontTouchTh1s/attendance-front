import React, {useEffect, useState} from 'react';

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

function CreatePenaltyCondition() {
    const [type, setType] = useState('delay');
    const [duration, setDuration] = useState('');
    const [penalty, setPenalty] = useState('');
    const [groupPolicy, setGroupPolicy] = useState('');
    const [groupPolicies, setGroupPolicies] = useState([]);
    const [typeTitle, setTypeTitle] = useState('تاخیر');

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
        e.preventDefault();
        let data = {
            'type': type,
            'duration': duration,
            'penalty': penalty,
            'group_policy_id': groupPolicy
        };
        try {
            const response = await Api.post('/penalty-conditions/create', data);
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

    useEffect(() => {
        fetchWorkPlaces();
    }, [])

    async function fetchWorkPlaces() {
        try {
            const response = await Api.get('/group-policies');
            // handle successful response
            setGroupPolicies(response.data);

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
        <Box>
            <Typography component="h1" variant="h4">
                ساخت شرط جریمه
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید شرایط جدید برای جریمه شدن کارمندان در صورت تاخیر، تاجیل یا خروج میان کار تعیین کنید.
            </Typography>
            <Container disableGutters maxWidth={'md'} component={'main'} sx={{p: {xs: 2, md: 3}}}>
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
                        <TextField
                            fullWidth
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder={'زمان'}
                            helperText={'زمان به دقیقه'}
                            label={'مدت زمان ' + typeTitle + ' برای اعمال جریمه'}
                            type={'number'}
                        >
                        </TextField>
                    </Grid>
                    <Grid sm={6} xs={12}>
                        <TextField
                            fullWidth
                            value={penalty}
                            onChange={(e) => setPenalty(e.target.value)}
                            placeholder={'زمان'}
                            helperText={'زمان به دقیقه'}
                            label={'جریمه'}
                            type={'number'}
                        >
                        </TextField>
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
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