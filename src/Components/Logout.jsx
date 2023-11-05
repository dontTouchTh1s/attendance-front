import {useContext, useEffect} from "react";
import Api from "../Api";
import {useNavigate} from "react-router-dom";
import UserContext from "../Contexts/UserContext";

function Logout() {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    useEffect(() => {
        async function userLogout() {
            try {
                let response = await Api.post('/auth/logout');
                if (response.status === 200) {
                    user.current.setMainDrawerUser(null);
                    navigate('/');
                }
            } catch (error) {
                navigate('/');
            }
        }

        userLogout();
    })
}

export default Logout