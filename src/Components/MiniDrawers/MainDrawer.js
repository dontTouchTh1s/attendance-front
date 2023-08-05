import EmployeeMiniDrawer from "./EmployeeMiniDrawer";
import ManagerMiniDrawer from "./ManagerMiniDrawer";
import GuestMiniDrawer from "./GuestMiniDrawer";
import UserContext from "../../Contexts/UserContext";
import {useContext, useEffect, useState} from "react";
import MAAMiniDrawer from "./MAAMiniDrawer";
import EAAMiniDrawer from "./EAAMiniDrawer";

function MainDrawer() {
    const user = useContext(UserContext);
    const [navBarUser, setNavBarUser] = useState({});


    function nav() {
        if (navBarUser !== undefined) {
            if (navBarUser.roll === 'employee') return <EmployeeMiniDrawer/>
            else if (navBarUser.roll === 'manager') return <ManagerMiniDrawer/>
            else if (navBarUser.roll === 'expertAdministrativeAffairs') return <EAAMiniDrawer/>
            else if (navBarUser.roll === 'managerAdministrativeAffairs') return <MAAMiniDrawer/>
            else return <GuestMiniDrawer/>
        } else return <GuestMiniDrawer/>
    }

    function getNavBarUser() {
        return navBarUser;
    }

    useEffect(() => {
        user.current = {navBarUser: getNavBarUser, setNavBarUser};
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