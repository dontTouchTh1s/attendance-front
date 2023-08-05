import MiniDrawer from "../Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BackHandIcon from '@mui/icons-material/BackHand';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import React from "react";
import PanToolIcon from '@mui/icons-material/PanTool';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import PolicyIcon from "@mui/icons-material/Policy";
import GavelIcon from "@mui/icons-material/Gavel";
import BadgeIcon from '@mui/icons-material/Badge';

function EAAMiniDrawer() {
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
                    path: '/panel/manager/attendance-leaves',
                    title: 'ورود و خروج کارکنان',
                    icon: <ApartmentIcon/>
                },
                {
                    path: '/panel/manager/objections',
                    title: 'اعتراضات کارکنان',
                    icon: <PanToolIcon/>
                },
                {
                    path: '/panel/manager/create-group-policy',
                    title: 'ساخت سیاست کاری',
                    icon: <PolicyIcon/>
                },
                {
                    path: '/panel/manager/create-penalty-condition',
                    title: 'ساخت شرایط جریمه',
                    icon: <GavelIcon/>
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

export default EAAMiniDrawer;