import React, {useEffect, useState} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BackHandIcon from "@mui/icons-material/BackHand";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PanToolIcon from "@mui/icons-material/PanTool";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PolicyIcon from "@mui/icons-material/Policy";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MiniDrawer from "../Drawer";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";

function CustomDrawer({role}) {
    const [pages, setPages] = useState([]);
    const [sections, setSections] = useState([]);
    useEffect(() => {
        if (role === 'managerAdministrativeAffairs') {
            setPages([
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
                    path: '/panel/manager/work-places',
                    title: 'محل کار',
                    icon: <AddHomeWorkIcon/>
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
                {
                    path: '/panel/manager/create-employee',
                    title: 'اضافه کردن کارمند',
                    icon: <PersonAddIcon/>
                },
                {
                    path: '/panel/manager/employees',
                    title: 'کارمندان',
                    icon: <BadgeIcon/>
                }])
            setSections([
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
            ])
        } else if (role === 'expertAdministrativeAffairs') {
            setPages([
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
            ]);
        } else if (role === 'manager') {
            setPages([
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
            ]);
            setSections([
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
            ])
        } else if (role === 'superAdmin') {
            setPages([
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
                    path: '/panel/manager/work-places',
                    title: 'محل کار',
                    icon: <AddHomeWorkIcon/>
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
                {
                    path: '/panel/manager/create-employee',
                    title: 'اضافه کردن کارمند',
                    icon: <PersonAddIcon/>
                },
                {
                    path: '/panel/manager/employees',
                    title: 'کارمندان',
                    icon: <BadgeIcon/>
                },
            ]);
            setSections([
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
            ])
        } else if (role === 'employee') {
            setPages([
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
            ]);
            setSections([
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
            ])
        } else {
            setPages([
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
            ]);
            setSections([
                {
                    path: '/',
                    title: 'صفحه اصلی',
                    icon: <HomeIcon/>
                },
            ]);
        }
    }, [role])

    return (
        <>
            <MiniDrawer
                pages={pages}
                section={sections}>
                <Box sx={{padding: '24px 0'}}>
                    <Outlet>
                    </Outlet>
                </Box>
            </MiniDrawer>
        </>
    );
}

export default CustomDrawer;