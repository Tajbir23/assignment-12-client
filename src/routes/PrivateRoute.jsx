import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";


const PrivateRoute = ({children}) => {
    const {loading, user, logOut, setUser} = useContext(AuthContext);
    const location = useLocation();
    const {checkUser, checkUserLoading} = useUser()
  
    if(loading ) {
        return <Loading />
    }

    if(checkUserLoading) {
        return <Loading />
    }

    if(user){
        if(checkUser?.status === "blocked"){
            toast.error('You have been blocked')
        logOut()
        setUser(null)
        return <Navigate to='/'></Navigate>
        }
    }
    
    if(user && checkUser?.status === "active") return children;

    

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
}

export default PrivateRoute