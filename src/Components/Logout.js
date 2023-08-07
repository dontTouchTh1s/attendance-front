import {useContext, useEffect} from "react";
import Api from "../Api";
import {useNavigate} from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import CurrentPageContext from "../Contexts/CurrentPageContext";

function Logout() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const currentPage = useContext(CurrentPageContext);

    async function userLogout() {
        try {
            let response = await Api.post('/auth/logout');
            if (response.status === 200) {
                user.current.setNavBarUser({});
                navigate('/');
                currentPage.current.setNavBarCurrentPage('/');
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        userLogout();
    })
}

export default Logout