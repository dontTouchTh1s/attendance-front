import React, {useEffect, useState} from 'react';

import {
    Box, Container,
    Typography
} from "@mui/material";
import Api from "../../Api";
import EmployeesDataGrid from "./EmployeesDataGrid";

function ShowEmployees() {
    const [employees, setEmployees] = useState({rows: []});
    useEffect(() => {
        async function getEmployees() {
            const response = await Api.get('/employees');
            // handle successful response
            console.log(response)
            let data = response.data.data;
            setEmployees({
                rows: data
            });
        }

        getEmployees();
    }, [])


    return (
        <Box>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                کارمندان
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید کارمندان شرکت را مشاهده کنید.

            </Typography>
            <Container disableGutters sx={{py: {sx: 1, md: 2}}}>

                <EmployeesDataGrid
                    data={employees}>

                </EmployeesDataGrid>
            </Container>
        </Box>
    )

}

export default ShowEmployees;