import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading";


const Recommendation = () => {
    const {register, reset, handleSubmit} = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['recommendation'],
        queryFn: async() => {
            const res = await axiosPublic.get("/recommendation")
            return res.data
        }
    })

    if(isLoading) return <Loading />
    if(isError){
        console.log(isError)
    }

    const onSubmit = async(data) => {
        console.log(data)
        const res = await axiosSecure.post("/recommendation", data)
        if(res.data?.insertedId){
            reset()
            toast.success("Recommendation added successfully")
            refetch()
        }
    }

    const handleDelete = async(id) => {
        const response =await  axiosSecure.delete(`/recommendation/${id}`)
        if(response.data?.deletedCount){
            toast.success("Recommendation deleted successfully")
            refetch()
        }
    }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md ">
        <h2 className="text-lg font-semibold  capitalize ">Add Recommendation</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title">Title</label>
              <input
                required
                {...register("title", { required: true })}
                id="title"
                name="title"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                required
                {...register("description", { required: true })}
                id="description"
                name="description"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

          </div>

          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="px-8 w-full sm:w-auto py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    <div className="mt-10">
        <h2 className="text-lg font-semibold  capitalize ">All Recommendations</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {data?.map(item => (
                <div className="shadow-2xl p-5 border rounded-lg flex flex-col" key={item?._id}>
                    <h3 className="text-xl font-bold">{item?.title}</h3>
                    <p className="flex-1">{item?.description}</p>
                    <button onClick={()=> handleDelete(item?._id)} className="bg-gray-700 text-white py-2 px-4 mt-5 rounded-md ">Delete</button>
                </div>
            ))}
        </div>
    </div>
    </div>
  )
}

export default Recommendation