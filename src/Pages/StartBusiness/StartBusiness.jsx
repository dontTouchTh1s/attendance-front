import React, {useRef, useState} from "react";
import {
    Box,
    Container,
    CssBaseline, Snackbar,
    Step,
    StepLabel,
    Stepper,
    ThemeProvider,
    Typography
} from "@mui/material";
import {theme} from "../../Theme/rtl-theme";
import RTL from "../../Theme/RTL";
import CreateBusinessAccount from "./CreateBusinessAccount";
import BusinessDetails from "./BusinessDetails";
import Finish from "./Finish";
import Api from "../../Api";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/lab";

const steps = ['مشخصات کسب و کار', 'ساخت حساب', 'شروع مدیریت!'];

function StartBusiness() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [nextEnable, setNextEnable] = useState(true);
    const createBusinessAccountChildRef = useRef();
    const businessDetailsChildRef = useRef();
    const [nextLoading, setNextLoading] = useState(false);
    const data = useRef({
        businessName: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        login: false
    });
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        type: 'error'
    });

    async function handleCreateBusiness() {
        try {
            const {businessName} = data.current;
            const response = await Api.post('/business/create', {name: businessName});
            return response.status === 201;

        } catch (e) {
            setSnackbarState({
                open: true,
                type: 'error',
                message: 'در هنگام ارتباط با سرور مشکلی پیش آمده است، لطفا بعدا تلاش کنید.'
            });
            return false;
        }
    }

    async function handleCreateAccount() {
        try {
            const {login, ...rest} = data.current;
            const response = await Api.post('/auth/register', {...rest, role: 'businessAdmin'});
            if (response.data.status === 409) {
                setSnackbarState({
                    open: true,
                    type: 'error',
                    message: 'حسابی با این ایمیل قبلا ساخته شده است.'
                })
            }
            return response.status === 201;

        } catch (e) {
            setSnackbarState({
                open: true,
                type: 'error',
                message: 'در هنگام ارتباط با سرور مشکلی پیش آمده است، لطفا بعدا تلاش کنید.'
            });
            return false;
        }
    }

    async function handleLoginAccount() {
        try {
            const {email, password} = data.current;

            const response = await Api.post('/auth/login', {email, password});
            if (response.data.status === 401) {
                setSnackbarState({
                    open: true,
                    type: 'error',
                    message: 'نام کاربری یا رمز عبور اشتباه است.'
                });

            }
            return response.status === 200;

        } catch (e) {
            setSnackbarState({
                open: true,
                type: 'error',
                message: 'در هنگام ارتباط با سرور مشکلی پیش آمده است، لطفا بعدا تلاش کنید.'
            });
            return false;
        }
    }

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        switch (activeStep) {
            case 0:
                if (createBusinessAccountChildRef.current.checkErrors())
                    return;
                if (data.current.login) {
                    setNextLoading(true);
                    const result = await handleLoginAccount();
                    setNextLoading(false);
                    if (!result)
                        return;
                } else {
                    setNextLoading(true);
                    const result = await handleCreateAccount();
                    setNextLoading(false);
                    if (!result)
                        return;
                }
                break;
            case 1: {
                if (businessDetailsChildRef.current.checkErrors())
                    return;
                setNextLoading(true);
                const result = await handleCreateBusiness();
                setNextLoading(false);
                if (!result)
                    return;
                break;
            }
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    function businessDetails() {
        return (
            <BusinessDetails
                ref={businessDetailsChildRef}
                lastBusinessName={data.current.businessName}
                onChange={(d) => data.current = {...data.current, ...d}}
                onErrorChange={(error) => setNextEnable(!error)}>
            </BusinessDetails>
        )
    }

    function createBusinessAccount() {
        return (
            <CreateBusinessAccount
                ref={createBusinessAccountChildRef}
                initialValues={{...data.current}}
                onChange={(d) => data.current = {...data.current, ...d}}
                onErrorChange={(error) => setNextEnable(!error)}>
            </CreateBusinessAccount>
        )
    }

    function finish() {
        return (
            <Finish>

            </Finish>
        );
    }

    function currentPage() {
        if (activeStep === 0)
            return createBusinessAccount();
        else if (activeStep === 1)
            return businessDetails();
        else
            return finish();


    }

    function handleSnackBarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState({...snackbarState, open: false});
    }

    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{mt: 7}}>
                    <Typography component="h1" variant="h4" textAlign={'center'}>
                        شروع کسب کار جدید
                    </Typography>
                    <Container disableGutters sx={{py: {xs: 1, sm: 2}}} maxWidth={'md'}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};

                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <Box sx={{p: {xs: 2, md: 3}, minHeight: '350px'}}>
                            {
                                currentPage()
                            }
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            {
                                activeStep <= 1 &&
                                <LoadingButton
                                    loading={nextLoading}
                                    variant={'contained'}
                                    disabled={!nextEnable}
                                    onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'پایان' : 'بعدی'}
                                </LoadingButton>
                            }
                        </Box>
                    </Container>
                </Box>
                <Snackbar
                    open={snackbarState.open}
                    autoHideDuration={6000}
                    onClose={handleSnackBarClose}>
                    <Alert severity={snackbarState.type} sx={{width: '100%'}}>
                        {snackbarState.message}
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </RTL>

    );
}

export default StartBusiness;