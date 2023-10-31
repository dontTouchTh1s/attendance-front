import React, {useEffect, useState} from 'react';

import {
    Box, Container,
    Typography
} from "@mui/material";
import Api from "../../Api";
import EmployeesDataGrid from "./EmployeesDataGrid";
import useEmployees from "../../Hooks/useEmployees";

function ShowEmployees() {
    const {employeesIsLoading, employees} = useEmployees();
    console.log(employees ?? [])

    return (
        <Box>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                کارمندان
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید کارمندان شرکت را مشاهده کنید.

            </Typography>
            <Container disableGutters sx={{py: {xs: 1, sm: 2}}}>
                <EmployeesDataGrid
                    loading={employeesIsLoading}
                    data={{rows: employees ?? []}}>
                </EmployeesDataGrid>
            </Container>
        </Box>
    )

}

export default ShowEmployees;