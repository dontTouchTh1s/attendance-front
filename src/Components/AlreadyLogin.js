import {useNavigate} from "react-router-dom";
import {useContext, useLayoutEffect} from "react";
import Api from "../Api";
import CurrentPageContext from "./CurrentPageContext";

function AlreadyLogin() {
    const navigate = useNavigate();
    const {setCurrentPage} = useContext(CurrentPageContext);

    useLayoutEffect(() => {
        async function getUser() {
            try {
                let response = await Api.get('/auth/');
                if (response.status === 200) {
                    setCurrentPage(0);
                    navigate('/dashboard');
                }

            } catch (error) {

            }
        }

        getUser();
    });
}

export default AlreadyLogin;