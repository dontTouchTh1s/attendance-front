import React, {useEffect, useState} from 'react';

import {
    Box, Container,
    Typography
} from "@mui/material";
import Api from "../../Api";
import AttendanceLeaveDataGridManager from "./AttendanceLeaveDataGridManager";

function ShowAttendanceLeavesManager() {
    const [attendanceLeaves, setAttendanceLeaves] = useState({rows: []});
    useEffect(() => {
        async function getAttendanceLeaves() {
            const response = await Api.get('/attendance-leaves/');
            // handle successful response
            console.log(response)
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
                ورود و خروج کارکنان
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                زمان ورود و خروج کارکنان در جدول زیر نمایش داده شده است. در صورت خطا یا تداخل میتوانید آنها را به صورت
                دستی ویرایش کنید.
            </Typography>
            <Container disableGutters sx={{py: {sx: 1, md: 2}}}>
                <AttendanceLeaveDataGridManager
                    data={attendanceLeaves}>
                </AttendanceLeaveDataGridManager>
            </Container>
        </Box>
    )

}

export default ShowAttendanceLeavesManager;