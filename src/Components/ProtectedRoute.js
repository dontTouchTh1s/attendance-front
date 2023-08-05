import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import Api from "../Api";
import UserContext from "../Contexts/UserContext";
import CurrentPageContext from "../Contexts/CurrentPageContext";

function ProtectedRoute({requiredRoll, children}) {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const currentPage = useContext(CurrentPageContext);
    const [checked, setChecked] = useState(false);

    async function getUser() {
        try {
            let response = await Api.get('/auth/');
            user.current.setNavBarUser(response.data);
            console.log(response)
            setChecked(true);
            if (requiredRoll !== undefined) {
                if (!requiredRoll.includes(response.data.roll)) {
                    currentPage.current.setNavBarCurrentPage('/panel');
                    navigate('/panel');
                }
            }
        } catch (error) {
            if (error.response) {
                // handle error response
                if (error.response.status === 401) {
                    currentPage.current.setNavBarCurrentPage('/login');
                    user.current.setNavBarUser({});
                    navigate('/login');
                }
            } else if (error.request) {
                // handle no response
                console.log(error.request);
            } else {
                // handle other errors
                console.log('Error', error.message);
            }
        }
    }

    useEffect(() => {
        getUser()
    });

    return (


        checked ? children : ''

    );
}

export default ProtectedRoute