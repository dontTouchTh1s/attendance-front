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
import Dashboard from "./Pages/dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

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
                element: <Login/>,
            },
            {
                path: "/sing-up",
                element: <SingUp/>,
            },
            {
                path: "/leave-requests",
                element: <LeaveRequests/>,
            },
            {
                path: "/create-leave-request",
                element: <CreateLeaveRequest/>,
            },
            {
                path: "/work-place-options",
                element: <CreateWorkPlace/>,
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
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
