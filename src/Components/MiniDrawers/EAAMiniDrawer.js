import MiniDrawer from "../Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BackHandIcon from '@mui/icons-material/BackHand';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import React from "react";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import PanToolIcon from '@mui/icons-material/PanTool';
import EventBusyIcon from '@mui/icons-material/EventBusy';

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
                    icon: <BackHandIcon/>
                },
                {
                    path: '/panel/manager/leave-requests',
                    title: 'درخواست های مرخصی',
                    icon: <EventBusyIcon/>
                },
                {
                    path: '/panel/manager/work-places',
                    title: 'محل کار',
                    icon: <AddHomeWorkIcon/>
                },
                {
                    path: '/panel/manager/attendance-leaves',
                    title: 'ورود و خروج کارکنان',
                    icon: <ApartmentIcon/>
                },
                {
                    path: '/panel/manager/objections',
                    title: 'اعتراضات کارکنان',
                    icon: <PanToolIcon/>
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