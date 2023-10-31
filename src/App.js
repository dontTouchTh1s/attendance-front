import React, {useRef} from "react";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import RTL from "./Theme/RTL";
import {theme} from "./Theme/rtl-theme";
import UserContext from "./Contexts/UserContext";
import MainDrawer from "./Components/MiniDrawers/MainDrawer";
import {Outlet} from "react-router-dom";

function App() {
    const user = useRef({
        mainDrawerUser: null, setMainDrawerUser: () => {
        }
    });
    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <UserContext.Provider value={user}>
                    <MainDrawer>
                    </MainDrawer>
                </UserContext.Provider>
            </ThemeProvider>
        </RTL>

    )
}

export default App;
