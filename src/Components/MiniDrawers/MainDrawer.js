import UserContext from "../../Contexts/UserContext";
import {useContext, useEffect, useState} from "react";
import {Button} from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import Api from "../../Api";
import CurrentPageContext from "../../Contexts/CurrentPageContext";
import {useNavigate} from "react-router-dom";

function MainDrawer() {
    const user = useContext(UserContext);
    const [mainDrawerUser, setMainDrawerUser] = useState({});
    const [test, setTest] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('updating');
        getUser();
        user.current = {
            mainDrawerUser: mainDrawerUser, setMainDrawerUser: setUser
        }
    }, [])

    function setUser(newUser) {
        if (newUser.roll === undefined) {
            setMainDrawerUser(newUser);
        } else if (newUser !== mainDrawerUser) {
            setMainDrawerUser(newUser);
            user.current = {...user.current, mainDrawerUser: newUser}
            console.log(newUser)
        }
    }

    async function getUser() {
        try {
            console.log('fetching user')
            let response = await Api.get('/auth/');
            setUser(response.data);
        } catch (error) {
            if (error.response) {
                // handle error response
                if (error.response.status === 401) {
                    setUser({});
                }
            }
        }
    }


    return (
        <>
            {
                user.current.mainDrawerUser !== undefined ?
                    <CustomDrawer roll={user.current.mainDrawerUser.roll}/> : ''
            }
        </>
    )
}

export default MainDrawer;