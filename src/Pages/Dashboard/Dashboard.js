import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Card, Container, Paper, switchClasses, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";
import Api from "../../Api";
import Grid2 from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Unstable_Grid2";
import PersonIcon from '@mui/icons-material/Person';
import UserContext from "../../Contexts/UserContext";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment-jalaali";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LastLeaveRequests from "./LastLeaveRequests";
import "../../Theme/custom-scrollbar.css";

function Dashboard() {
    const [months, setMonths] = useState([]);
    const [counts, setCounts] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [groupPolicy, setGroupPolicy] = useState([]);
    const [workPlace, setWorkPlace] = useState([]);
    const [lastLeaveRequests, setLastLeaveRequests] = useState([]);
    const user = useContext(UserContext);

    async function fetchLeaveRequests() {
        try {
            const response = await Api.get('/leave-requests');
            setMonths(response.data.map((l) =>
                l.month
            ));
            setCounts(response.data.map((l) =>
                parseInt(l.time)
            ));
            // handle successful response
        } catch (error) {
            console.log(error)
        }

    }

    async function fetchEmployee() {
        try {
            const response = await Api.get('/auth/employee');
            await fetchLastLeaveRequests(response.data.id);
            setEmployee(response.data);
        } catch (e) {

        }
    }

    async function fetchGroupPolicy() {
        try {
            const response = await Api.get('/auth/employee/group-policy');
            setGroupPolicy(response.data);
        } catch (e) {

        }
    }

    async function fetchWorkPlace() {
        try {
            const response = await Api.get('/auth/employee/group-policy/work-place');
            setWorkPlace(response.data);
        } catch (e) {

        }
    }

    async function fetchLastLeaveRequests(id) {
        let data = {
            'employee_id': id,
            'count': 5,
            'order_by': 'id',
            'order_option': 'DESC'
        };
        try {
            const response = await Api.get('/leave-requests', {params: data});
            setLastLeaveRequests(response.data);
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchLeaveRequests();
        fetchEmployee();
        fetchGroupPolicy();
        fetchWorkPlace();
    }, [])
    return (
        <Box>
            <Typography component="h1" variant="h4">
                داشبورد
            </Typography>
            <Box sx={{
                p: {xs: 1, md: 2}
            }}>
                <Grid container spacing={{xs: 1, md: 2}}>
                    <Grid xs={12} md={9} container spacing={{xs: 1, md: 2}}>
                        <Grid xs={12}>
                            <Paper
                                sx={{
                                    p: {xs: 1, md: 2}
                                }}
                                variant={'outlined'}>
                                <Grid container>
                                    <Grid xs={12} md={1}>
                                        <Avatar sx={{}}>
                                            <PersonIcon fontSize={'large'}/>
                                        </Avatar>
                                    </Grid>
                                    <Grid xs={12} md={11}>
                                        <Typography component="p" variant="h6">
                                            {employee.first_name}
                                            {' '}
                                            {employee.last_name}
                                        </Typography>
                                        <Typography component="p" variant="p">
                                            {
                                                user.current.navBarUser.roll === 'managerAdministrativeAffairs' ?
                                                    'مدیر امور اداری' :
                                                    user.current.navBarUser.roll === 'expertAdministrativeAffairs' ?
                                                        'کارشناس امور اداری' :
                                                        user.current.navBarUser.roll === 'manager' ?
                                                            'سرپرست' :
                                                            user.current.navBarUser.roll === 'employee' ?
                                                                'کارمند' : ''
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={12}>
                                <Typography component="h3" variant="h5">
                                    {'آخرین درخواست های مرخصی'}
                                </Typography>
                                <Grid container spacing={{xs: 1, md: 2}} wrap={"nowrap"}
                                      className={'custom-scrollbar medium'}
                                      sx={{
                                          overflowX: 'scroll',
                                          pt: 1
                                      }}>
                                    <LastLeaveRequests
                                        leaveRequests={lastLeaveRequests}
                                        employeeWorkHour={{
                                            start: groupPolicy.work_start_hour,
                                            end: groupPolicy.work_end_hour
                                        }}
                                    >

                                    </LastLeaveRequests>
                                </Grid>
                            </Grid>
                            <Grid xs={12}>
                                {
                                    counts.length !== 0 ?
                                        <BarChart sx={{
                                            width: '100%'
                                        }}

                                                  xAxis={[{scaleType: 'band', data: months}]}
                                                  series={[{
                                                      data: counts,
                                                      label: 'مرخصی ها در ماه های گذشته',
                                                      type: 'bar'
                                                  }]}
                                                  width={500}
                                                  height={300}
                                        /> : 'داده ای وجود ندارد'
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={3}>
                        <Paper sx={{
                            p: {xs: 1, md: 2}
                        }}
                               variant={"outlined"}>
                            <Typography component="p" variant="p" sx={{fontSize: '0.75rem'}}>
                                {'گروه سیاست کاری'}
                            </Typography>
                            <Typography component="p" variant="h6">
                                {groupPolicy.name}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                gap: '8px'
                            }}>
                                <AccessTimeIcon/>
                                <Typography component="p" variant="p">
                                    {'ساعت کاری: '}
                                    {moment("2022-02-02T" + groupPolicy.work_start_hour).format('HH:mm')}
                                    {' تا '}
                                    {moment("2022-02-02T" + groupPolicy.work_end_hour).format('HH:mm')}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: '8px'
                            }}>
                                <ApartmentIcon/>
                                <Typography component="p" variant="p">
                                    {'محل کار: '}
                                    {workPlace.name}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashboard;