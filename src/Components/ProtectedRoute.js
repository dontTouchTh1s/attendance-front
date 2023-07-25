import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Api from "../Api";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        async function getUser() {
            try {
                await Api.get('/auth/');

            } catch (error) {
                if (error.response) {
                    // handle error response
                    if (error.response.status === 401)
                        navigate('/login');
                } else if (error.request) {
                    // handle no response
                    console.log(error.request);
                } else {
                    // handle other errors
                    console.log('Error', error.message);
                }
            }
        }

        getUser();
    });


    return children;
}

export default ProtectedRoute