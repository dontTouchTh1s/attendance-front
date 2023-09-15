import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Api from "../Api";
import CurrentPageContext from "../Contexts/CurrentPageContext";
import UserContext from "../Contexts/UserContext";

function AlreadyLogin({children}) {
    const navigate = useNavigate();
    const currentPage = useContext(CurrentPageContext);
    const [checked, setChecked] = useState(false);
    const user = useContext(UserContext);
    useEffect(() => {
        async function getUser() {
            try {
                let response = await Api.get('/auth/');
                if (response.status === 200) {
                    user.current.setNavBarUser(response.data);
                    currentPage.current.setNavBarCurrentPage('/panel');
                    navigate('/panel');
                }
                setChecked(true);
            } catch (error) {
                console.log('error');
                setChecked(true);
            }
        }

        getUser();
    });
    return (
        checked ? children : ''
    )
}

export default AlreadyLogin;