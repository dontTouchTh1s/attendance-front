import React from 'react';
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
import ShowAttendanceLeave from "./Pages/AttendanceLeave/ShowAttendanceLeave";
import CreateGroupPolicy from "./Pages/GroupPolicies/CreateGroupPolicy";
import CreatePenaltyCondition from "./Pages/PenlatyConditions/CreatePenaltyCondition";

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


handlePermission();
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/login",
                element: <AlreadyLogin><Login/></AlreadyLogin>,
            },
            {
                path: "/sing-up",
                element: <AlreadyLogin><SingUp/></AlreadyLogin>
            },
            {
                path: "/leave-requests",
                element: <ProtectedRoute><LeaveRequests/></ProtectedRoute>
            },
            {
                path: "/create-leave-request",
                element: <ProtectedRoute><CreateLeaveRequest/></ProtectedRoute>
            },
            {
                path: "/work-place-options",
                element: <ProtectedRoute><CreateWorkPlace/></ProtectedRoute>
            },
            {
                path: "/Dashboard",
                element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
            },
            {
                path: "/attendance-leaves",
                element: <ProtectedRoute><ShowAttendanceLeave/></ProtectedRoute>,
            },
            {
                path: "/create-group-policy",
                element: <ProtectedRoute><CreateGroupPolicy/></ProtectedRoute>,
            },
            {
                path: "/create-penalty-condition",
                element: <ProtectedRoute><CreatePenaltyCondition/></ProtectedRoute>,
            },
        ],

    }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
