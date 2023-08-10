import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";
import Api from "../../Api";

function Dashboard() {
    const [months, setMonths] = useState([]);
    const [counts, setCounts] = useState([]);

    async function fetchLeaveRequests() {
        try {
            const response = await Api.get('/leave-requests');
            console.log(response)
            setMonths(response.data.map((l) =>
                l.month
            ));
            setCounts(response.data.map((l) =>
                l.time
            ));
            // handle successful response
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchLeaveRequests();
    }, [])
    return (
        <Box>
            <Typography component="h1" variant="h4">
                داشبورد
            </Typography>
            {
                counts.length !== 0 ?
                    <BarChart
                        xAxis={[{scaleType: 'band', data: months}]}
                        series={[{data: counts, label: 'مرخصی ها در ماه های گذشته', type: 'bar'}]}
                        width={500}
                        height={300}
                    /> : 'داده ای وجود ندارد'
            }
        </Box>
    )
}

export default Dashboard;