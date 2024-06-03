import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"


const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['checkAdmin'],
        queryFn: async () => {
            const res = axiosSecure.get(`/admin/${user?.email}`)
            return res.data
        }
    })
  return {isAdmin, isAdminLoading}
}

export default useAdmin