import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useContext, useState} from "react";
import UserContext from "../Contexts/UserContext";
import LoadingCircle from "./LoadingCircle";

function AlreadyLogin({children}) {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const data = useLoaderData();
    const [auth, setAuth] = useState(false);

    async function checkUser() {
        const userData = await data.currentUser;
        if (userData) {
            user.current.setMainDrawerUser(userData.data);
            if (userData.data) {
                navigate('/panel');
            } else {
                user.current.setMainDrawerUser(null);
            }
        } else {
            user.current.setMainDrawerUser(null);
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
            >
                {auth && children}
            </Await>
        </Suspense>
    )
}

export default AlreadyLogin;