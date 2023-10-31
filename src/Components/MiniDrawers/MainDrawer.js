import UserContext from "../../Contexts/UserContext";
import {useContext, useEffect, useState} from "react";
import CustomDrawer from "./CustomDrawer";

function MainDrawer() {
    const user = useContext(UserContext);
    const [mainDrawerUser, setMainDrawerUser] = useState(null);
    user.current = {mainDrawerUser, setMainDrawerUser};
    return (
        <>
            {
                <CustomDrawer role={mainDrawerUser ? mainDrawerUser.role : 'guest'}/>
            }
        </>
    )
}

export default MainDrawer;