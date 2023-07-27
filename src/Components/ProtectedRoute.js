import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../Api";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        async function getUser() {
            try {
                await Api.get('/auth/');
                setChecked(true);
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


    return (
        checked ? children : ''
    );
}

export default ProtectedRoute