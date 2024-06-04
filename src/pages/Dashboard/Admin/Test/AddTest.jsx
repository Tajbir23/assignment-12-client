import { useForm } from "react-hook-form"
import Title from "../../Title"
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";


const AddTest = () => {
const {register,
    reset,
    handleSubmit,
    formState: { errors }} = useForm();
const axiosSecure = useAxiosSecure()

    const today = new Date();
  const todayString = today.toISOString().substring(0, 10)

    const onsubmit = async(data) => {
        console.log(data)
        const date = new Date(data?.date).getTime();
        const image = {image: data?.image[0]}
        const name = data?.name
        const price = data?.price
        const title = data?.title
        const details = data?.details
        const slot = data?.slot
        axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(async(response) => {
        const imageUrl = response.data.data.url;
        const res = await axiosSecure.post('/add_test', {date: date,title: title, name: name, price: price, image: imageUrl, description: details, slot: slot})
        console.log(res.data);
        if (res?.data?.acknowledged) {
            reset()
            toast.success("Test added successfully")
        }
      })

    }
  return (
    <>
    <Title text="Add A Test" />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Add A Test
        </h2>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="title"
              {...register("title", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter name"
            />
            {errors?.name?.types === "required" && (
              <p className="text-red-500">Title is required</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter name"
            />
            {errors?.name?.types === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              required
              {...register("image", { required: true })}
              name="image"
              type="file"
              className="file-input file-input-bordered w-full block mt-2"
            />
            {errors?.image?.types === "required" && (
              <p className="text-red-500">Image is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <textarea
              {...register("details", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Enter details here"
            ></textarea>
            {errors?.details?.types === "required" && (
              <p className="text-red-500">Details is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter price"
            />
            {errors?.price?.types === "required" && (
              <p className="text-red-500">Price is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: true, min: todayString })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min={todayString}
              placeholder="Enter date"
            />
            {errors?.date?.types === "required" && (
              <p className="text-red-500">Date is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slot
            </label>
            <input
              type="number"
              {...register("slot", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter slot"
            />
            {errors?.coupon?.types === "required" && (
              <p className="text-red-500">Slot is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddTest