import React, {useEffect, useState} from 'react';

import {
    Box, Container,
    Typography
} from "@mui/material";
import Api from "../../Api";
import AttendanceLeaveDataGridManager from "./AttendanceLeaveDataGridManager";
import AttendanceLeaveDataGrid from "./AttendanceLeaveDataGrid";

function ShowAttendanceLeavesManager() {
    const [attendanceLeaves, setAttendanceLeaves] = useState({rows: []});
    useEffect(() => {
        async function getAttendanceLeaves() {
            const response = await Api.get('/attendance-leaves/user');
            // handle successful response
            let data = response.data;
            setAttendanceLeaves({
                rows: data
            });
        }

        getAttendanceLeaves();
    }, [])


    return (
        <Box>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                ورود و خروج
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید ورود و خروج ثبت شده خود را مشاهده کنید، در صورت خطا در اطلاعات ثبت شده میتوانید به
                آنها اعتراض کنید تا توسط مدیر بررسی شود.
            </Typography>
            <Container disableGutters sx={{py: {xs: 1, sm: 2}}}>

                <AttendanceLeaveDataGrid
                    data={attendanceLeaves}>

                </AttendanceLeaveDataGrid>
            </Container>
        </Box>
    )

}

export default ShowAttendanceLeavesManager;