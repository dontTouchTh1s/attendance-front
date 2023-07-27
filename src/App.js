import './App.css';
import React, {useEffect, useState} from "react";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import RTL from "./Theme/RTL";
import {Outlet} from "react-router-dom";
import {theme} from "./Theme/rtl-theme";
import Api from "./Api";
import locationTracker from './Location/locationTracker'
import MiniDrawer from "./Components/Drawer";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CurrentPageContext from "./Components/CurrentPageContext";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function App() {
    const [currentPage, setCurrentPage] = useState();

    const geoOptions = {enableHighAccuracy: false, maximumAge: 0,};
    useEffect(() => {

        async function getCsrf() {
            await Api.get('http://localhost:8000/sanctum/csrf-cookie');
        }

        getCsrf();

        locationTracker(geoOptions);

    });
    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <CurrentPageContext.Provider value={{currentPage, setCurrentPage}}>
                    <MiniDrawer
                        links={['/Dashboard', '/login', '/sing-up', '/leave-requests', '/create-leave-request', '/work-place-options', 'attendance-leaves']}
                        titles={['داشبورد', 'ورود', 'ثبت نانم', 'درخواست های مرخصی', 'ایجاد درخواست مرخصی', 'محل کار', 'ورود و خروج']}
                        icons={[
                            <DashboardIcon/>,
                            <LoginIcon/>,
                            <AppRegistrationIcon/>,
                            <RequestPageIcon/>,
                            <PostAddIcon/>,
                            <ApartmentIcon/>,
                            <AccessTimeIcon/>
                        ]}>
                        <Box sx={{padding: '24px 0'}}>
                            <Outlet>
                            </Outlet>
                        </Box>
                    </MiniDrawer>
                </CurrentPageContext.Provider>

            </ThemeProvider>
        </RTL>

    )
}

export default App;
