import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import "@fortawesome/fontawesome-free/css/all.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page";
import Login from "./Login";
import SingUp from "./SingUp";
import LeaveRequests from "./leaveReqests/LeaveRequests";
import App from "./App";
import "./Api"


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
                path: "leave-requests",
                element: <LeaveRequests/>,
            }
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
