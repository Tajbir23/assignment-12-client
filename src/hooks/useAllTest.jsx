import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"


const useAllTest = ({currentPage, filter}) => {
    const axiosPublic = useAxiosPublic()
    console.log(filter)
    const {data, isLoading, isError} = useQuery({
        queryKey: ['all_are_tests', currentPage, filter],
        queryFn: async () => {
            const response = await axiosPublic.get(`/all_tests?currentPage=${currentPage}&filter=${filter}`)
            return {data: response?.data?.data, total: response?.data?.total}
        }
    })

    if(isError){
        console.log(isError)
    }

    return {data, isLoading}
}

export default useAllTest