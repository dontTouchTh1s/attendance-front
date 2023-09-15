import React, {useEffect, useState} from 'react';
import {Box, Container, switchClasses, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";
import Api from "../../Api";
import Grid2 from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Unstable_Grid2";

function Dashboard() {
    const [months, setMonths] = useState([]);
    const [counts, setCounts] = useState([]);

    async function fetchLeaveRequests() {
        try {
            const response = await Api.get('/leave-requests');
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
            <Grid container>
                <Grid xs={12}>
                    {
                        counts.length !== 0 ?
                            <BarChart sx={{
                                width: '100'
                            }}

                                      xAxis={[{scaleType: 'band', data: months}]}
                                      series={[{data: counts, label: 'مرخصی ها در ماه های گذشته', type: 'bar'}]}
                                      width={500}
                                      height={300}
                            /> : 'داده ای وجود ندارد'
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard;