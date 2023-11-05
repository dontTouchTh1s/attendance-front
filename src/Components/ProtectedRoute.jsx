import {Await, defer, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useContext, useState} from "react";
import Api from "../Api";
import UserContext from "../Contexts/UserContext";
import getCookie from "../Functions/GetCookie/GetCookie";
import LoadingCircle from "./LoadingCircle";

export async function loader() {

    if (getCookie('is_auth')) {
        try {
            let response = Api.get('/auth/');
            return defer({currentUser: response});
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    return {currentUser: null};
                }
            }
        }
    } else {
        return {currentUser: null};
    }
}

function ProtectedRoute({requiredRole = 'guest', children}) {
    const data = useLoaderData();
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [auth, setAuth] = useState(false);


    async function checkUser() {
        let userData = await data.currentUser;
        // userData.data = {role: 'managerAdministrativeAffairs'}
        if (userData) {
            user.current.setMainDrawerUser(userData.data);
            if (requiredRole !== 'guest') {
                if (userData.data) {
                    if (!requiredRole.includes(userData.data.role)) {
                        navigate('/panel');
                    }
                } else {
                    navigate('/login');
                }
            }
        } else {
            navigate('/login');
        }
        setAuth(true);
    }

    if (!auth) checkUser();

    return (
        <Suspense
            fallback={<LoadingCircle height={'80vh'}/>}
        >
            <Await
                resolve={data.currentUser}
                errorElement={
                    <p>Error loading package location!</p>
                }
                children={auth && children}
            >
            </Await>
        </Suspense>
    );
}

export default ProtectedRoute