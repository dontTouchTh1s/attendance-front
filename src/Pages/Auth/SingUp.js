import React, {useState} from 'react';
import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import Api from "../../Api";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";


function SingUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== cPassword)
            return;
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        try {
            setLoading(true);
            await Api.post('/auth/register', formData);
            setLoading(false);
            navigate('/login');
            // handle successful response
        } catch (error) {

        }
    }

    return (
        <Box>
            <CssBaseline/>
            <Typography component="h1" variant="h4" sx={{textAlign: 'center'}}>
                ثبت نام
            </Typography>
            <Container disableGutters maxWidth={'xs'} sx={{p: {xs: 1, md: 2}}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    <Grid xs={12}>
                        <TextField
                            type="name"
                            required
                            fullWidth
                            label="نام"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            type="email"
                            required
                            fullWidth
                            label="ایمیل"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>

                        <TextField
                            required
                            fullWidth
                            label="رمز عبود"
                            type="password"
                            autoComplete="new-password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>

                        <TextField
                            required
                            fullWidth
                            label="تکرار رمز عبور"
                            type="text"
                            autoComplete="new-password"
                            onChange={(e) => {
                                setCPassword(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            ثبت نام
                        </LoadingButton>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

export default SingUp;