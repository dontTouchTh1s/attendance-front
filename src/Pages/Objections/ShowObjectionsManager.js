import React, {useEffect, useState} from 'react';

import {
    Box, Container,
    Typography
} from "@mui/material";
import Api from "../../Api";
import ObjectionDataGrid from "./ObjectionDataGrid";

function ShowObjectionsManager() {
    const [objections, setObjections] = useState({rows: []});

    async function handleModifyObjections() {
        await fetchObjections();
    }

    async function fetchObjections() {
        const response = await Api.get('/objections/');
        // handle successful response
        console.log(response.data)
        let data = response.data.data;
        setObjections({
            rows: data
        });
    }

    useEffect(() => {
        fetchObjections().then({});
    }, [])


    return (
        <Box>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                اعترضات
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش اعتراضات کارمندان مروبط به اطلاعات ورود خروج آنها را میتوانید مشاهده کنید.

            </Typography>
            <Container disableGutters sx={{py: {sx: 1, md: 2}}}>

                <ObjectionDataGrid
                    onModifyObjection={handleModifyObjections}
                    data={objections}>

                </ObjectionDataGrid>
            </Container>
        </Box>
    )

}

export default ShowObjectionsManager;