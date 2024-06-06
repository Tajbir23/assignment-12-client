import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TestUpdateModal = ({updateData, setUpdateData, refetch}) => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm();
    const axiosSecure = useAxiosSecure();

    const onsubmit = async(data) => {
        const res = await axiosSecure.patch("/update-test", {price: data?.price, slot: data?.slot, id: updateData?.data?._id})
        console.log(res.data)
        if(res.data?.modifiedCount){
            toast.success(`${updateData?.data?.name} updated successfully`)
            refetch()
            reset()
            setUpdateData({modal: false})
        }
    }


  return (
    <div className="absolute z-50 top-0 h-screen w-full flex items-center justify-center ">
      <div className="w-1/2 p-10 bg-white drop-shadow-2xl rounded-xl border border-black bg-opacity-100">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Update {updateData.data.name}
        </h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price")}
              defaultValue={updateData?.data?.price}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Price"
            />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slot
            </label>
            <input
              type="number"
              {...register("slot")}
              defaultValue={updateData?.data?.slot}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Slot"
            />
            
          </div>
          <div className="flex gap-5 mt-5">
            <button className="btn btn-secondary" onClick={() => setUpdateData({modal: false})}>Close</button>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestUpdateModal;
