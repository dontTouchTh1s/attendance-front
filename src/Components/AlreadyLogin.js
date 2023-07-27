import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Api from "../Api";
import CurrentPageContext from "./CurrentPageContext";

function AlreadyLogin({children}) {
    const navigate = useNavigate();
    const {setCurrentPage} = useContext(CurrentPageContext);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        async function getUser() {
            try {
                let response = await Api.get('/auth/');
                if (response.status === 200) {
                    setCurrentPage(0);
                    navigate('/Dashboard');
                }
                setChecked(true);
            } catch (error) {
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