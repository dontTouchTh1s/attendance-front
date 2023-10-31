import {Box, CircularProgress, Typography} from "@mui/material";

function LoadingCircle({height = '100%', message, size = 40}) {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                px: 3,
                gap: 2
            }}>
            <Typography component={'span'} variant={'body1'}>
                {message}
            </Typography>
            <CircularProgress size={size}/>
        </Box>
    );
}

export default LoadingCircle;