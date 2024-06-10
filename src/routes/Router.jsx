import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Authentications/SignUp";
import Login from "../pages/Authentications/Login";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";
import Appointments from "../pages/Dashboard/Appointments";
import TestResults from "../pages/Dashboard/TestResults";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AddBanners from "../pages/Dashboard/Admin/Banners/AddBanners";
import Banners from "../pages/Dashboard/Admin/Banners/Banners";
import AddTest from "../pages/Dashboard/Admin/Test/AddTest";
import AllTest from "../pages/AllTest/AllTest";
import Details from "../pages/AllTest/Details";
import DashboardAllTest from "../pages/Dashboard/Admin/Test/DashboardAllTest";
import Reservation from "../pages/Dashboard/Admin/Test/Reservation";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import Profile from "../pages/Dashboard/Profile";
import Recommendation from "../pages/Dashboard/Admin/Recommendation";
import About from "../pages/Home/About";
import ContactUs from "../pages/Home/ContactUs";
import Faq from "../pages/Home/Faq";

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
            },
            {
                path: '/all_test',
                element: <AllTest />
            },
            {
                path: '/test_details/:id',
                element: <PrivateRoute><Details /></PrivateRoute>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact-us',
                element: <ContactUs />
            },
            {
                path: '/faq',
                element: <Faq />
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
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: '/dashboard/appointments',
                element: <PrivateRoute><Appointments /></PrivateRoute>
            },
            {
                path: '/dashboard/test_results',
                element: <PrivateRoute><TestResults /></PrivateRoute>
            },
            {
                path: '/dashboard/all_users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: '/dashboard/add_banner',
                element: <AdminRoute><AddBanners /></AdminRoute>
            },
            {
                path: '/dashboard/all_banners',
                element: <AdminRoute><Banners/></AdminRoute>
            },
            {
                path: '/dashboard/add_test',
                element: <AdminRoute><AddTest /></AdminRoute>
            },
            {
                path: '/dashboard/all_test',
                element: <AdminRoute><DashboardAllTest /></AdminRoute>
            },
            {
                path: '/dashboard/reservation/:id',
                element: <AdminRoute><Reservation /></AdminRoute>
            },
            {
                path: '/dashboard/statistics',
                element: <AdminRoute><Statistics /></AdminRoute>
            },
            {
                path: '/dashboard/recommendation',
                element: <AdminRoute><Recommendation /></AdminRoute>
            }
        ]
    }
    
])

export default router;