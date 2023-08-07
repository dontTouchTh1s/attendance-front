import React, {useEffect, useState} from 'react';

import {
    Box, Container,
    Typography
} from "@mui/material";
import Api from "../../Api";
import ObjectionDataGrid from "./ObjectionDataGrid";
import UserObjectionDataGrid from "./UserObjectionDataGrid";

function ShowObjections() {
    const [objections, setObjections] = useState({rows: []});
    useEffect(() => {
        async function fetchObjections() {
            const response = await Api.get('/objections/user');
            // handle successful response
            let data = response.data.data;
            setObjections({
                rows: data
            });
        }

        fetchObjections();
    }, [])


    return (
        <Box>
            <Typography component="h1" variant="h4" sx={{marginTop: '8px'}}>
                اعترضات
            </Typography>
            <Typography component='p' sx={{marginTop: '8px'}}>
                در این بخش میتوانید اعتراضات خود را مشاهده کنید.

            </Typography>
            <Container disableGutters sx={{py: {xs: 1, sm: 2}}}>

                <UserObjectionDataGrid
                    data={objections}>

                </UserObjectionDataGrid>
            </Container>
        </Box>
    )

}

export default ShowObjections;