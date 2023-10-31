import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Paper, Stack, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";
import Api from "../../Api";
import Grid from "@mui/material/Unstable_Grid2";
import PersonIcon from '@mui/icons-material/Person';
import UserContext from "../../Contexts/UserContext";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment-jalaali";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LastLeaveRequests from "./LastLeaveRequests";
import "../../Theme/custom-scrollbar.css";
import Skeleton from '@mui/material/Skeleton';
import useSWR from "swr";
import LoadingCircle from "../../Components/LoadingCircle";
import {styled} from "@mui/material/styles";
import useSWRImmutable from "swr/immutable";


const IconBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

async function fetcher(url) {
    return Api.get(url).then(response => response.data);
}

async function requestsFetcher([url, params]) {
    return Api.get(url, {params: params}).then(response => response.data);
}

function Dashboard() {
    const {data: employee} = useSWRImmutable('/auth/employee', fetcher);
    const {data: lastLeaveRequests} = useSWRImmutable(() => ['/leave-requests', employee.id ? {
        'employee_id': employee.id,
        'count': 5,
        'order_by': 'id',
        'order_option': 'DESC'
    } : false], (url, params) => requestsFetcher(url, params), {revalidateOnMount: true})
    const {data: leaveRequests} = useSWRImmutable(() => ['/leave-requests/group-by-month', employee.id ? {
        'employee_id': employee.id
    } : false], (url, params) => requestsFetcher(url, params), {revalidateOnMount: true});
    const {data: workPlace} = useSWRImmutable('/auth/employee/group-policy/work-place', fetcher);
    const {data: groupPolicy} = useSWRImmutable('/auth/employee/group-policy', fetcher);
    const [months, setMonths] = useState([]);
    const [counts, setCounts] = useState([]);

    const user = useContext(UserContext);


    useEffect(() => {
        function generateChartProps() {
            setMonths(leaveRequests.map((l) =>
                l.month
            ));
            setCounts(leaveRequests.map((l) =>
                parseInt(l.time)
            ));
        }

        if (leaveRequests) {
            generateChartProps();
        }
    }, [leaveRequests])

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
                                        {
                                            !employee ?
                                                <Skeleton variant={"circular"} height={50} width={50}/>
                                                :
                                                <Avatar sx={{}}>
                                                    <PersonIcon fontSize={'large'}/>
                                                </Avatar>
                                        }
                                    </Grid>
                                    <Grid xs={12} md={11}>
                                        {
                                            !employee ?
                                                <Skeleton height={25} width={120}/>
                                                :
                                                <>
                                                    <Typography component="p" variant="h6">
                                                        {employee.first_name}
                                                        {' '}
                                                        {employee.last_name}
                                                    </Typography>
                                                    <Typography component="p" variant="p">
                                                        {
                                                            user.current.role === 'managerAdministrativeAffairs' ?
                                                                'مدیر امور اداری' :
                                                                user.current.role === 'expertAdministrativeAffairs' ?
                                                                    'کارشناس امور اداری' :
                                                                    user.current.role === 'manager' ?
                                                                        'سرپرست' :
                                                                        user.current.role === 'employee' ?
                                                                            'کارمند' : ''
                                                        }
                                                    </Typography>
                                                </>
                                        }
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
                                    {
                                        !lastLeaveRequests ?
                                            <>
                                                <Stack p={1} pt={3}>
                                                    <Box p={1}>
                                                        <Skeleton variant="h6"/>
                                                    </Box>
                                                    <Stack direction={'row'} spacing={1} p={1}>
                                                        <Skeleton variant="rounded" width={77} height={32}
                                                                  sx={{borderRadius: '20px'}}/>
                                                        <Skeleton variant="rounded" width={60} height={32}
                                                                  sx={{borderRadius: '20px'}}/>
                                                        <Skeleton variant="rounded" width={54} height={32}
                                                                  sx={{borderRadius: '20px'}}/>
                                                    </Stack>
                                                    <Box p={1}>
                                                        <Skeleton variant="rounded" width={220} height={60}/>
                                                    </Box>
                                                    <Stack p={1} spacing={1}>
                                                        <Skeleton height={10}/>
                                                        <Skeleton height={10}/>
                                                        <Skeleton height={10} width={'80%'}/>
                                                    </Stack>
                                                </Stack>
                                                <Stack pt={3}>
                                                    <Box p={1}>
                                                        <Skeleton variant="h6"/>
                                                    </Box>
                                                    <Stack direction={'row'} spacing={1} p={1}>
                                                        <Skeleton variant="rounded" width={77} height={32}
                                                                  sx={{borderRadius: '20px'}}/>
                                                        <Skeleton variant="rounded" width={60} height={32}
                                                                  sx={{borderRadius: '20px'}}/>
                                                        <Skeleton variant="rounded" width={54} height={32}
                                                                  sx={{borderRadius: '20px'}}/>
                                                    </Stack>
                                                    <Box p={1}>
                                                        <Skeleton variant="rounded" width={220} height={60}/>
                                                    </Box>
                                                    <Stack p={1} spacing={1}>
                                                        <Skeleton height={10}/>
                                                        <Skeleton height={10}/>
                                                        <Skeleton height={10} width={'80%'}/>
                                                    </Stack>
                                                </Stack>
                                            </> :
                                            <LastLeaveRequests
                                                leaveRequests={lastLeaveRequests}
                                                employeeWorkHour={{
                                                    start: groupPolicy.work_start_hour,
                                                    end: groupPolicy.work_end_hour
                                                }}
                                            >

                                            </LastLeaveRequests>
                                    }


                                </Grid>
                            </Grid>
                            <Grid xs={12}>
                                <Box sx={{display: 'flex', justifyContent: 'center', minHeight: 300}}>
                                    {
                                        leaveRequests ?
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
                                                /> : 'داده ای وجود ندارد' :
                                            <LoadingCircle/>
                                    }
                                </Box>
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
                                {
                                    groupPolicy ?
                                        groupPolicy.name :
                                        <Skeleton variant={'h6'} animation={'wave'}/>
                                }
                            </Typography>
                            <IconBox>
                                <AccessTimeIcon/>
                                <Typography component="span" variant="body1">
                                    {'ساعت کاری: '}
                                </Typography>
                                {
                                    groupPolicy ?
                                        <Typography component="span" variant="body1">
                                            {
                                                moment("2022-02-02T" + groupPolicy.work_start_hour).format('HH:mm') +
                                                ' تا '
                                                + moment("2022-02-02T" + groupPolicy.work_end_hour).format('HH:mm')

                                            }
                                        </Typography> :
                                        <Skeleton variant={'rounded'} height={10} animation={'wave'}
                                                  sx={{flexGrow: 1}}/>
                                }
                            </IconBox>
                            <IconBox>
                                <ApartmentIcon/>
                                <Typography component="span" variant="body1">
                                    {'محل کار: '}
                                </Typography>
                                {
                                    workPlace ?
                                        <Typography component="span" variant="body1">
                                            {workPlace.name}
                                        </Typography> :
                                        <Skeleton variant={'rounded'} height={10} animation={'wave'}
                                                  sx={{flexGrow: 1}}/>
                                }
                            </IconBox>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashboard;