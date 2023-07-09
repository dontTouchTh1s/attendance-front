import './App.css';
import React, {useEffect} from "react";
import {ThemeProvider} from "@mui/material";
import RTL from "./Theme/RTL";
import {Link, Outlet} from "react-router-dom";
import {theme} from "./Theme/rtl-theme";
import Api from "./Api";


function App() {
    const MINUTE_MS = 10000;
    const geoOptions = {};
    useEffect(() => {

        const interval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error, geoOptions);
            } else {
                console.log("Geolocation not supported");
            }

            function success(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            }
            console.log("asdasd");
            function error(error) {
                console.log(error);
            }


        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        async function getCsrf() {
            await Api.get('http://172.27.6.102:8000/sanctum/csrf-cookie');
        }

        getCsrf();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <RTL>
                <div id="sidebar">
                    سلام این یک متن فارسی است
                    <h1>React Router Contacts</h1>
                    <p><Link to={'/login'}>login</Link></p>
                    <p><Link to={'/sing-up'}>sing up</Link></p>
                    <p><Link to={'/leave-requests'}>leave requests</Link></p>
                    <p><Link to={'/create-leave-request'}>create leave request</Link></p>
                    <p><Link to={'/work-place-options'}>Work place options</Link></p>

                </div>
                <Outlet>

                </Outlet>
            </RTL>
        </ThemeProvider>
    )
}

export default App;
