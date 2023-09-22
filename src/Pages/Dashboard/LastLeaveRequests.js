import React, {useState} from "react";
import {Box, Card, CardContent, CardHeader, Chip} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import moment from "moment-jalaali";

function LastLeaveRequests({leaveRequests, employeeWorkHour}) {
    console.log(leaveRequests);
    const leaveRequestsCard = leaveRequests.map(lr => {
            console.log(lr);
            console.log(employeeWorkHour)
            let leaveType = lr.from_hour !== employeeWorkHour.start && lr.to_hour !== employeeWorkHour.end ? 'ساعتی' : 'روزانه';
            let statusText = 'رد شده';
            let statusColor = 'error';
            if (lr.status === 'pending') {
                statusText = 'بررسی';
                statusColor = 'warning';
            } else if (lr.status === 'accepted') {
                statusText = 'تایید شده';
                statusColor = 'success';
            }


            return (
                <Grid xs={11} sm={5.5} md={3.6} sx={{
                    flexShrink: 0,
                }}>
                    <Card sx={{
                        width: '100%',
                        height: '100%'
                    }}>
                        <CardHeader
                            title={
                                <Typography component="p" variant="h6">
                                    {'درخواست مرخصی'}
                                </Typography>
                            }>
                        </CardHeader>
                        <Box sx={{
                            padding: '0 16px',
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                        }}>
                            <Chip
                                label={lr.type === 'paid' ? 'استحقاقی' : 'استعلاجی'}
                                color='info'
                                variant={'outlined'}></Chip>
                            <Chip
                                color={'info'}
                                variant={'outlined'}
                                label={leaveType}></Chip>
                            <Chip
                                color={statusColor}
                                variant={'outlined'}
                                label={statusText}></Chip>
                        </Box>

                        <CardContent>
                            <Box sx={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                                direction: 'ltr',
                                alignItems: 'center'
                            }}>
                                <DateRangeOutlinedIcon color={'unImportant'}/>
                                <Box sx={{
                                    width: '75%',
                                    flexGrow: 1
                                }}>
                                    <Typography fontWeight={300} fontSize={'0.95rem'}>
                                        <Typography component="span" variant="p">
                                            {'از تاریخ '}
                                        </Typography>
                                        <Typography component="span" variant="p" sx={{
                                            unicodeBidi: 'plaintext'
                                        }}>
                                            {moment(lr.from_date).format('YYYY-MM-DD')}
                                        </Typography>
                                    </Typography>
                                    <Typography fontWeight={300} fontSize={'0.95rem'}>
                                        <Typography component="span" variant="p">
                                            {' تا تاریخ '}
                                        </Typography>
                                        <Typography component="span" variant="p" sx={{
                                            unicodeBidi: 'plaintext'
                                        }}>
                                            {moment(lr.to_date).format('YYYY-MM-DD')}
                                        </Typography>
                                    </Typography>
                                </Box>
                                {
                                    leaveType === 'ساعتی' ?
                                        <>
                                            <AccessTimeIcon color={'unImportant'}/>
                                            <Box sx={{
                                                width: '75%',
                                                flexGrow: 1
                                            }}>
                                                <Typography fontWeight={300} fontSize={'0.95rem'}>
                                                    <Typography component="span" variant="p">
                                                        {'از ساعت '}
                                                    </Typography>
                                                    <Typography component="span" variant="p" sx={{
                                                        unicodeBidi: 'plaintext'
                                                    }}>
                                                        {moment('2022-01-22T' + lr.from_hour).format('HH:mm')}
                                                    </Typography>
                                                </Typography>
                                                <Typography fontWeight={300} fontSize={'0.95rem'}>
                                                    <Typography component="span" variant="p">
                                                        {' تا ساعت '}
                                                    </Typography>
                                                    <Typography component="span" variant="p" sx={{
                                                        unicodeBidi: 'plaintext'
                                                    }}>
                                                        {moment('2022-01-22T' + lr.to_hour).format('HH:mm')}
                                                    </Typography>
                                                </Typography>
                                            </Box>

                                        </>
                                        : ''
                                }
                            </Box>

                            <Box className={'custom-scrollbar small'} sx={{
                                maxHeight: '70px',
                                overflowY: 'scroll',
                            }}>
                                <Typography component={'p'} variant={'p'} sx={{mt: 1}}>
                                    {lr.description}
                                </Typography>
                            </Box>

                        </CardContent>

                    </Card>
                </Grid>
            );
        }
    )

    return (
        <>
            {
                leaveRequestsCard
            }
        </>
    );
}

export default LastLeaveRequests;