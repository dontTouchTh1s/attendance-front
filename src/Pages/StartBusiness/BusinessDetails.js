import {Container, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";

const BusinessDetails = forwardRef((props, ref) => {
    const {onChange, lastBusinessName} = props;
    const [businessName, setBusinessName] = useState(lastBusinessName);
    const [nameError, setNameError] = useState('');

    useImperativeHandle(ref, () => ({
        checkErrors() {
            return handleNameError();
        }
    }));

    function handleNameError(value) {
        if (value === '') {
            setNameError('لطفا یک نام معتبر وارد کنید.');
            return true;
        } else {
            setNameError('');
            return false;
        }
    }

    return (
        <>
            <Typography component='p' sx={{marginTop: '8px'}}>
                برای شروع، اول مشخصات کسب و کارت رو وارد کن.
            </Typography>
            <Container disableGutters sx={{py: {xs: 1, sm: 2}}} maxWidth={'xs'}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid xs={12}>
                        <TextField
                            type="نام کسب و کار"
                            required
                            onBlur={(e) => handleNameError(e.target.value)}
                            error={nameError !== ''}
                            helperText={nameError}
                            fullWidth
                            label="نام کسب و کار"
                            autoFocus
                            value={businessName}
                            onChange={(e) => {
                                setBusinessName(e.target.value);
                                onChange({businessName: e.target.value});
                                handleNameError(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
});

export default BusinessDetails;