import {Box, Container, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";
import Guide from "../../Components/UserGuide/Guide";

function Finish() {
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
                    <Link to={'/panel/manager/work-places'}>
                        <LoadingButton
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
