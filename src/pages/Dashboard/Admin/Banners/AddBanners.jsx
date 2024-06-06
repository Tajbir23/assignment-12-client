import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Title from "../../Title";

const AddBanners = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();


  const onsubmit = (data) => {
    console.log(data.banner[0]);
    const date = Date.now();
    const image = { image: data.banner[0] };
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
      ).then((response) => {
      const imageUrl = response.data.data.url;
      const banner = {
        title: data.title,
        name: data.name,
        description: data.description,
        coupon: data.coupon,
        rate: Number(data.rate),
        image: imageUrl,
        date: date,
        isActive: false
      };
      axiosSecure.post('/add_banner', banner)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
          toast.success("Banner added successfully");
        }
      })
    })
    .catch((error) => {
      toast.error(error.message)
    })
    console.log(date);
  };
  return (
    <>
    <Title text="Add Banner" />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Add Banner
        </h2>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
            />
            {errors?.title?.types === "required" && (
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
              placeholder="Enter title"
            />
            {errors?.title?.types === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              required
              {...register("banner", { required: true })}
              name="banner"
              type="file"
              className="file-input file-input-bordered w-full block mt-2"
            />
            {errors?.banner?.types === "required" && (
              <p className="text-red-500">Image is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text
            </label>
            <textarea
              {...register("description", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Enter text"
            ></textarea>
            {errors?.description?.types === "required" && (
              <p className="text-red-500">Text is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coupon Code
            </label>
            <input
              type="text"
              {...register("coupon", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter coupon code"
            />
            {errors?.coupon?.types === "required" && (
              <p className="text-red-500">Coupon code is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Rate (%)
            </label>
            <input
              type="number"
              {...register("rate", { required: true })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              max="100"
              placeholder="Enter discount rate"
            />
            {errors?.rate?.types === "required" && (
              <p className="text-red-500">Discount rate is required</p>
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
  );
};

export default AddBanners;
