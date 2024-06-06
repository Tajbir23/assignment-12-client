import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"

const useMyAppointments = (pagination) => {
    const axiosSecure = useAxiosSecure()
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['my_appointments', pagination],
    queryFn: async () => {
        const response = await axiosSecure.get(`/my_appointments?current=${pagination?.current}`)
        return {data: response?.data?.data, total: response?.data?.total}
    }
  })

  if(isError){
    console.log(isError)
  }
  return {data, isLoading, refetch}
}

export default useMyAppointments