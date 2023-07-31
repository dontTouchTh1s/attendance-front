import EmployeeMiniDrawer from "./EmployeeMiniDrawer";
import ManagerMiniDrawer from "./ManagerMiniDrawer";
import EAADrawer from "./EAAMiniDrawer";
import GuestMiniDrawer from "./GuestMiniDrawer";
import UserContext from "../../Contexts/UserContext";
import {useContext, useEffect, useState} from "react";

function MainDrawer() {
    const user = useContext(UserContext);
    const [navBarUser, setNavBarUser] = useState({});


    function nav() {
        if (navBarUser !== undefined) {
            if (navBarUser.roll === 'employee') return <EmployeeMiniDrawer/>
            else if (navBarUser.roll === 'manager') return <ManagerMiniDrawer/>
            else if (navBarUser.roll === 'expertAdministrativeAffairs') return <EAADrawer/>
            else return <GuestMiniDrawer/>
        } else return <GuestMiniDrawer/>
    }

    useEffect(() => {
        user.current = {navBarUser, setNavBarUser};
    }, []);
    return (
        <>
            {
                nav()
            }
        </>
    )
}

export default MainDrawer;