import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ProtectedRoute({children}){
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('email');
        if (user === null){
            navigate('/login');
        }
    });

    return children;
}
export default ProtectedRoute