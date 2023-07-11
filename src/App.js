import './App.css';
import React, {useEffect, useState} from "react";
import {ThemeProvider} from "@mui/material";
import RTL from "./Theme/RTL";
import {Link, Outlet} from "react-router-dom";
import {theme} from "./Theme/rtl-theme";
import Api from "./Api";
import locationTracker from './Location/locationTracker'


function App() {
    const MINUTE_MS = 10000;
    const geoOptions = {enableHighAccuracy: false, maximumAge: 0,};
    const [location, setLocation] = useState({lat: 0, lng: 0});
    const [err, setErr] = useState('');
    useEffect(() => {

        const interval = setInterval(() => {

        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {

        async function getCsrf() {
            await Api.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
        }
        getCsrf();
        locationTracker(geoOptions);

    }, []);
    return (
        <ThemeProvider theme={theme}>
            <RTL>
                <div id="sidebar">
                    <p>{err}</p>
                    <p>{location.lat}</p>
                    <p>{location.lng}</p>
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
