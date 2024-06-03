import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import useAdmin from "../hooks/useAdmin"
import Loading from "../components/Loading"
import { Navigate, useLocation } from "react-router-dom"


const AdminRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext)
  
  const {isAdmin, isAdminLoading} = useAdmin()
  const location = useLocation()

  if(loading || isAdminLoading) {
    return <Loading />
  }
  if(user && isAdmin) return children

  return <Navigate to='/dashboard' state={{from: location}} replace />
}

export default AdminRoute