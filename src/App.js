import './App.css';
import React, {useEffect} from "react";
import {ThemeProvider} from "@mui/material";
import RTL from "./theme/RTL";
import {Link, Outlet} from "react-router-dom";
import {theme} from "./theme/rtl-theme";
import Api from "./Api";


function App() {
    useEffect(() => {
        async function getCsrf() {
            await Api.get('http://localhost:8000/sanctum/csrf-cookie');
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

                </div>
                <Outlet>

                </Outlet>
            </RTL>
        </ThemeProvider>
    )
}

export default App;
