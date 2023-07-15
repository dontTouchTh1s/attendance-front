import './App.css';
import React, {useEffect, useState} from "react";
import {Box, Container, ThemeProvider} from "@mui/material";
import RTL from "./Theme/RTL";
import {Link, Outlet} from "react-router-dom";
import {theme} from "./Theme/rtl-theme";
import Api from "./Api";
import locationTracker from './Location/locationTracker'
import MiniDrawer from "./Components/Drawer";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PostAddIcon from '@mui/icons-material/PostAdd';
function App() {
    const geoOptions = {enableHighAccuracy: false, maximumAge: 0,};
    useEffect(() => {

        async function getCsrf() {
            await Api.get('http://localhost:8000/sanctum/csrf-cookie');
        }


        getCsrf();

        locationTracker(geoOptions);

    }, [geoOptions]);
    return (

        <ThemeProvider theme={theme}>
            <RTL>
                <MiniDrawer
                    links={['/login', '/sing-up', '/leave-requests', '/create-leave-request', '/work-place-options']}
                    titles={['ورود', 'ثبت نانم', 'درخواست های مرخصی', 'ایجاد درخواست مرخصی', 'محل کار']}
                    icons={[
                        <LoginIcon/>,
                        <AppRegistrationIcon/>,
                        <RequestPageIcon/>,
                        <PostAddIcon/>,
                        <ApartmentIcon/>

                    ]}>
                    <Box sx={{padding: '24px 0'}}>
                    <Outlet>
                    </Outlet>
                    </Box>
                </MiniDrawer>

            </RTL>
        </ThemeProvider>
    )
}

export default App;
