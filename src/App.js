import './App.css';
import React, {useRef} from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import RTL from "./Theme/RTL";
import {theme} from "./Theme/rtl-theme";
import CurrentPageContext from "./Contexts/CurrentPageContext";
import UserContext from "./Contexts/UserContext";

import MainDrawer from "./Components/MiniDrawers/MainDrawer";

function App() {
    const currentPage = useRef({});
    const user = useRef({user: {}});

    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <UserContext.Provider value={user}>
                    <CurrentPageContext.Provider value={currentPage}>
                        <MainDrawer>
                        </MainDrawer>
                    </CurrentPageContext.Provider>
                </UserContext.Provider>
            </ThemeProvider>
        </RTL>

    )
}

export default App;
