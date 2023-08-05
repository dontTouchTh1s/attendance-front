import MiniDrawer from "../Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestPageIcon from "@mui/icons-material/RequestPage";

import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import BackHandIcon from "@mui/icons-material/BackHand";

function EmployeeMiniDrawer() {
    return (
        <MiniDrawer
            pages={[
                {
                    path: '/panel',
                    title: 'پنل کابری',
                    icon: <DashboardIcon/>
                },
                {
                    path: '/panel/create-leave-request',
                    title: 'درخواست مرخصی',
                    icon: <PostAddIcon/>
                },
                {
                    path: '/panel/attendance-leaves',
                    title: 'ورود و خروج',
                    icon: <AccessTimeIcon/>
                },
                {
                    path: '/panel/objections',
                    title: 'اعتراضات',
                    icon: <BackHandIcon/>
                },
            ]}
            section={[
                {
                    path: '/',
                    title: 'صفحه اصلی',
                    icon: <HomeIcon/>
                },
                {
                    path: '/logout',
                    title: 'خروج',
                    icon: <LogoutIcon/>
                }
            ]}
        >
            <Box sx={{padding: '24px 0'}}>
                <Outlet>
                </Outlet>
            </Box>
        </MiniDrawer>
    )
}

export default EmployeeMiniDrawer;