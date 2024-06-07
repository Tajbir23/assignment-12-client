import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";


const Reservation = () => {
  const {id} = useParams();
  const axiosSecure = useAxiosSecure()

  const {data, isLoading, isError} = useQuery({
    queryKey: ["reservation"],
    queryFn: async() => {
      const res = await axiosSecure.get(`/reservation/${id}`);
      return res.data
    }
  })

  if(isLoading) return <Loading />

  if(isError){
    console.log(isError)
  }
  console.log(data)
  return (
    <div>Reservation</div>
  )
}

export default Reservation