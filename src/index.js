import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import "@fortawesome/fontawesome-free/css/all.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page";
import Login from "./Pages/Auth/Login";
import SingUp from "./Pages/Auth/SingUp";
import LeaveRequests from "./Pages/LeaveReqests/LeaveRequests";
import App from "./App";
import "./Api"
import CreateLeaveRequest from "./Pages/CreateRquest/CreateRequest";
import CreateWorkPlace from "./Pages/WorkPlace/CreateWorkPlace";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute, {loader as protectedRouteLoader} from "./Components/ProtectedRoute";
import AlreadyLogin from "./Components/AlreadyLogin";
import ShowAttendanceLeavesManager from "./Pages/AttendanceLeave/ShowAttendanceLeavesManager";
import CreateGroupPolicy from "./Pages/GroupPolicies/CreateGroupPolicy";
import CreatePenaltyCondition from "./Pages/PenlatyConditions/CreatePenaltyCondition";
import ShowAttendanceLeaves from "./Pages/AttendanceLeave/ShowAttendanceLeaves";
import locationTracker from "./Location/locationTracker";
import Api from "./Api";
import ShowObjectionsManager from "./Pages/Objections/ShowObjectionsManager";
import ShowObjections from "./Pages/Objections/ShowObjections";
import Home from "./Pages/Home/Home";
import Logout from "./Components/Logout";
import ShowEmployees from "./Pages/Employees/ShowEmployees";
import CreateEmployee from "./Pages/CreateEmployee/CreateEmployee";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {StrictMode} from "react";
import StartBusiness from "./Pages/StartBusiness/StartBusiness";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

function handlePermission() {

    navigator.permissions.query({name: "geolocation"}).then((result) => {
        if (result.state === "granted") {
        } else if (result.state === "prompt") {

        } else if (result.state === "denied") {
        }
        result.addEventListener("change", () => {
        });
    });
}

const geoOptions = {enableHighAccuracy: false, maximumAge: 0,};
locationTracker(geoOptions);

const minRoleEmployee = ['employee', 'manager', 'EAA', 'MAA', 'superAdmin'];
const minRoleManager = ['manager', 'EAA', 'MAA', 'superAdmin'];
const minRoleExpertAdmin = ['EAA', 'MAA', 'superAdmin'];

handlePermission();
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            // Guest routes
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <AlreadyLogin><Login/></AlreadyLogin>,
                loader: protectedRouteLoader
            },
            {
                path: "/sing-up",
                element: <AlreadyLogin><SingUp/></AlreadyLogin>,
                loader: protectedRouteLoader
            },
            // User routes
            {
                path: "/panel",
                element: <ProtectedRoute requiredRole={minRoleEmployee}><Dashboard/></ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/create-leave-request",
                element: <ProtectedRoute requiredRole={minRoleEmployee}><CreateLeaveRequest/></ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/attendance-leaves",
                element: <ProtectedRoute requiredRole={minRoleEmployee}><ShowAttendanceLeaves/></ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/objections",
                element: <ProtectedRoute requiredRole={minRoleEmployee}><ShowObjections/></ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/logout",
                element: <ProtectedRoute requiredRole={minRoleEmployee}><Logout/></ProtectedRoute>,
                loader: protectedRouteLoader
            },

            // Manager routes
            {
                path: "/panel/manager/leave-requests",
                element: <ProtectedRoute
                    requiredRole={minRoleManager}>
                    <LeaveRequests/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/attendance-leaves",
                element: <ProtectedRoute
                    requiredRole={minRoleManager}>
                    <ShowAttendanceLeavesManager/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/create-group-policy",
                element: <ProtectedRoute
                    requiredRole={minRoleExpertAdmin}>
                    <CreateGroupPolicy/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/create-penalty-condition",
                element: <ProtectedRoute
                    requiredRole={minRoleExpertAdmin}>
                    <CreatePenaltyCondition/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/objections",
                element: <ProtectedRoute
                    requiredRole={minRoleManager}>
                    <ShowObjectionsManager/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/work-places",
                element: <ProtectedRoute
                    requiredRole={['managerAdministrativeAffairs', 'superAdmin']}>
                    <CreateWorkPlace/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/employees",
                element: <ProtectedRoute
                    requiredRole={minRoleExpertAdmin}>
                    <ShowEmployees/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
            {
                path: "/panel/manager/create-employee",
                element: <ProtectedRoute
                    requiredRole={['managerAdministrativeAffairs', 'superAdmin']}>
                    <CreateEmployee/>
                </ProtectedRoute>,
                loader: protectedRouteLoader
            },
        ],
    },
    {
        path: '/start-business',
        element: <StartBusiness/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    //<StrictMode>
    <RouterProvider router={router}/>
    //</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
