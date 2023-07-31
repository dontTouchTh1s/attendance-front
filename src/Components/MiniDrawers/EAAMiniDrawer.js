import MiniDrawer from "../Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import React from "react";

function EmployeeDrawer() {
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
                    icon: <AccessTimeIcon/>
                },
                {
                    path: '/panel/manager/leave-requests',
                    title: 'درخواست های مرخصی',
                    icon: <RequestPageIcon/>
                },
                {
                    path: '/panel/manager/work-places',
                    title: 'محل کار',
                    icon: <ApartmentIcon/>
                },
                {
                    path: '/panel/manager/attendance-leaves',
                    title: 'ورود و خروج کارکنان',
                    icon: <AccessTimeIcon/>
                },
                {
                    path: '/panel/manager/objections',
                    title: 'اعتراضات کارکنان',
                    icon: <AccessTimeIcon/>
                },
            ]}>
            <Box sx={{padding: '24px 0'}}>
                <Outlet>
                </Outlet>
            </Box>
        </MiniDrawer>
    )
}

export default EmployeeDrawer;