import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Authentications/SignUp";
import Login from "../pages/Authentications/Login";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Appointments from "../pages/Dashboard/Appointments";
import TestResults from "../pages/Dashboard/TestResults";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <Error />,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><UpdateProfile /></PrivateRoute>
            },
            {
                path: '/dashboard/appointments',
                element: <PrivateRoute><Appointments /></PrivateRoute>
            },
            {
                path: '/dashboard/test_results',
                element: <PrivateRoute><TestResults /></PrivateRoute>
            }
        ]
    }
    
])

export default router;