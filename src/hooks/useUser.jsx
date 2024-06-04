import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email
    console.log(email)
    const {data: checkUser, isLoading: checkUserLoading} = useQuery({
        queryKey: [email, 'checkUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${email}`)
            return res?.data
        }
    })
  return {checkUser, checkUserLoading}
}

export default useUser