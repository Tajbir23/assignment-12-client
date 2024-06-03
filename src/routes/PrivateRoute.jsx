import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";


const PrivateRoute = ({children}) => {
    const {loading, user} = useContext(AuthContext);
    const location = useLocation()
  
    if(loading) {
        return <Loading />
    }

    if(user) return children;

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
}

export default PrivateRoute