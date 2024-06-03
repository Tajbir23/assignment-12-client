import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Authentications/SignUp";
import Login from "../pages/Authentications/Login";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";

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
        
    }
    
])

export default router;