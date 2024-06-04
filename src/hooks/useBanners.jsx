import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"


const useBanners = (pagination) => {
    const axiosSecure = useAxiosSecure();
    const currentPage = pagination.current;
    const pageSize = pagination.pageSize;

    const {data: banners, isLoading: bannersLoading, isError, refetch} = useQuery({
        queryKey: ['banners', pagination],
        queryFn: async () => {
            const res = await axiosSecure.get(`/banners?currentPage=${currentPage}&pageSize=${pageSize}`)
            return res?.data
        }
    })
    if (isError) {
        console.log(isError)
    }
  return {banners, bannersLoading, refetch}
}

export default useBanners