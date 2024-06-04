import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"


const useAllTest = (currentPage) => {
    const axiosPublic = useAxiosPublic()
    console.log(currentPage)
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['all_are_tests', currentPage],
        queryFn: async () => {
            const response = await axiosPublic.get(`/all_tests?currentPage=${currentPage}`)
            return {data: response?.data?.data, total: response?.data?.total}
        }
    })

    if(isError){
        console.log(isError)
    }

    return {data, isLoading, refetch}
}

export default useAllTest