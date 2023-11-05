import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import image from '../../Images/image.jpg';

function Home() {
    return (
        <Box>
            <Grid container spacing={{xs: 2, md: 3}}>
                <Grid lg={6}>
                    <Typography variant={'h2'} component={'h1'}>
                        سامانه ثبت حضور و مرخصی کارکنان
                    </Typography>
                </Grid>
                <Grid lg={6}>
                    <img src={image} width={'100%'}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home