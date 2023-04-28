import {Link, Outlet} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from '../theme/rtl-theme';
import RTL from "../theme/RTL";

export default function Root() {
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
    );
}