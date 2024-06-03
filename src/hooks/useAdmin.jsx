import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"


const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const email = user?.email
    console.log(user?.email)

    const {data: isAdmin, isLoading: isAdminLoading, error} = useQuery({
        queryKey: [ email, 'checkAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/${user?.email}`)
            if(res.data?.role === 'admin'){
                return res?.data
            }
        },
        
    })

    if(error){
        console.log(error.message)
    }
    
  return {isAdmin, isAdminLoading}
}

export default useAdmin