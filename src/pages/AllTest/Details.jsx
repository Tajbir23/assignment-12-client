import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading";


const Details = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic()
    const {data, isLoading, isError} = useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/test_details/${id}`)
            return res?.data;
        }
    })

    if(isLoading) return <Loading />

    if(isError){
        console.log(isError)
    }

    const date = new Date(data?.date).toDateString()
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={data?.image}
            alt="Diagnostic Center"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold text-gray-800">{data?.title}</h1>
          <h2 className="text-xl font-semibold text-gray-600 mt-2">{data?.name}</h2>
          <p className="text-gray-600 mt-4">
            Date: <span className="font-medium">{date}</span>
          </p>
          <p className="text-gray-600 mt-2">
            Description: <span className="font-medium">This is a brief description of the diagnostic center. It provides various health services and diagnostic tests.</span>
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Available Slots: {data?.slot}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Details