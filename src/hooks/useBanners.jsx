import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"


const useBanners = () => {
    const axiosSecure = useAxiosSecure();

    const {data: banners, isLoading: bannersLoading, isError, refetch} = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners')
            return res?.data
        }
    })
    if (isError) {
        console.log(isError)
    }
  return {banners, bannersLoading, refetch}
}

export default useBanners