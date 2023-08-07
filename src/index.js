import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import ProtectedRoute from "./Components/ProtectedRoute";
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

async function getCsrf() {
    try {
        await Api.get('http://localhost:8000/sanctum/csrf-cookie');
    } catch (error) {
        console.log("error while connecting to server");
        console.log(error.response);
    }
}

await getCsrf();

const geoOptions = {enableHighAccuracy: false, maximumAge: 0,};
locationTracker(geoOptions);


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
            },
            {
                path: "/sing-up",
                element: <AlreadyLogin><SingUp/></AlreadyLogin>
            },
            // User routes
            {
                path: "/panel/",
                element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
            },
            {
                path: "/panel/create-leave-request",
                element: <ProtectedRoute><CreateLeaveRequest/></ProtectedRoute>
            },
            {
                path: "/panel/attendance-leaves",
                element: <ProtectedRoute><ShowAttendanceLeaves/></ProtectedRoute>
            },
            {
                path: "/panel/objections",
                element: <ProtectedRoute><ShowObjections/></ProtectedRoute>
            },
            {
                path: "/logout",
                element: <ProtectedRoute><Logout/></ProtectedRoute>
            },

            // Manager routes
            {
                path: "/panel/manager/leave-requests",
                element: <ProtectedRoute
                    requiredRoll={['manager', 'expertAdministrativeAffairs', 'managerAdministrativeAffairs', 'superAdmin']}>
                    <LeaveRequests/>
                </ProtectedRoute>
            },
            {
                path: "/panel/manager/attendance-leaves",
                element: <ProtectedRoute
                    requiredRoll={['manager', 'expertAdministrativeAffairs', 'managerAdministrativeAffairs']}>
                    <ShowAttendanceLeavesManager/>
                </ProtectedRoute>,
            },
            {
                path: "/panel/manager/create-group-policy",
                element: <ProtectedRoute
                    requiredRoll={['expertAdministrativeAffairs', 'managerAdministrativeAffairs', 'superAdmin']}>
                    <CreateGroupPolicy/>
                </ProtectedRoute>,
            },
            {
                path: "/panel/manager/create-penalty-condition",
                element: <ProtectedRoute
                    requiredRoll={['expertAdministrativeAffairs', 'managerAdministrativeAffairs', 'superAdmin']}>
                    <CreatePenaltyCondition/>
                </ProtectedRoute>,
            },
            {
                path: "/panel/manager/objections",
                element: <ProtectedRoute
                    requiredRoll={['manager', 'expertAdministrativeAffairs', 'managerAdministrativeAffairs', 'superAdmin']}>
                    <ShowObjectionsManager/>
                </ProtectedRoute>
            },
            {
                path: "/panel/manager/work-places",
                element: <ProtectedRoute
                    requiredRoll={['managerAdministrativeAffairs', 'superAdmin']}>
                    <CreateWorkPlace/>
                </ProtectedRoute>
            },
            {
                path: "/panel/manager/employees",
                element: <ProtectedRoute
                    requiredRoll={['managerAdministrativeAffairs', 'expertAdministrativeAffairs', 'superAdmin']}>
                    <ShowEmployees/>
                </ProtectedRoute>
            },
            {
                path: "/panel/manager/create-employee",
                element: <ProtectedRoute
                    requiredRoll={['managerAdministrativeAffairs', 'superAdmin']}>
                    <CreateEmployee/>
                </ProtectedRoute>
            },
        ],
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
