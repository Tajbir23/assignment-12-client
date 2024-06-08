import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const UpdateReservation = ({setUpdateData, updateData, refetch}) => {
    const {register, handleSubmit} = useForm();
    const axiosSecure = useAxiosSecure();

    const onsubmit = async(data) => {
        const res = await axiosSecure.patch("/update-reservation", {link: data?.link, id: updateData?.id})
       
        if(res.data?.modifiedCount){
          setUpdateData({modal: false})
          refetch()
          toast.success("Updated successfully")
        }
        else{
          toast.error("Something went wrong")
        }
    }
  return (
    <div className="absolute z-50 top-0 h-screen w-full flex items-center justify-center ">
      <div className="w-1/2 p-10 bg-white drop-shadow-2xl rounded-xl border border-black bg-opacity-100">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Submit report
        </h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Enter report url
            </label>
            <input
              type="url"
              required
              {...register("link")}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter report url"
            />
            
          </div>

          <div className="flex gap-5 mt-5">
            <button className="btn btn-secondary" onClick={() => setUpdateData({modal: false})}>Close</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateReservation