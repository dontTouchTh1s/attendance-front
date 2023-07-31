import MiniDrawer from "../Drawer";


import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function GuestMiniDrawer() {
    return (
        <MiniDrawer
            pages={[
                {
                    path: '/login',
                    title: 'ورود',
                    icon: <LoginIcon/>
                },
                {
                    path: '/sing-up',
                    title: 'ثبت نام',
                    icon: <AppRegistrationIcon/>
                },
            ]}
        >
            <Box sx={{padding: '24px 0'}}>
                <Outlet>
                </Outlet>
            </Box>
        </MiniDrawer>
    )
}

export default GuestMiniDrawer;