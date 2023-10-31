import {Box, Container, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Api from "../../Api";
import {Link} from "react-router-dom";

function Finish() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleFinish() {
        try {
            setIsLoading(true);
            let response = await Api.post('/employees/create');
            setIsLoading(false);
            if (response.status === 201) {

            }
        } catch (error) {

            if (error.response.status === 422) {
                // setSnackbarMessage('کارمندی با این ایمیل قبلا ثبت شده است.');
            } else {
                // setSnackbarMessage('در هنگام ثبت اطلاعات مشکلی پیش آمده است.');
            }
        }
    }

    return (
        <>
            <Typography component='p' sx={{marginTop: '8px'}}>
                مرحله آخر!
            </Typography>
            <Container disableGutters sx={{py: {xs: 1, sm: 2}}} maxWidth={'xs'}>
                <Typography component='p' sx={{marginTop: '8px'}} textAlign={'center'}>
                    خب حالا که اطلاعات مربوط به حساب و کسب و کار رو داریم، میتونیم شروع کنیم!
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                    <Link to={'/panel'}>
                        <LoadingButton
                            loading={isLoading}
                            onClick={handleFinish}
                            variant='contained'
                        >
                            داشبورد مدیریت
                        </LoadingButton>
                    </Link>
                </Box>
            </Container>
        </>
    );
}

export default Finish;
