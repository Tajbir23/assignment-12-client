// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import toast from "react-hot-toast";
import Payment from "./Payments/Payment"



const PaymentModal = ({ data, refetch }) => {
  // const {register, reset, handleSubmit, formState: {errors}} = useForm();
  // const axiosSecure = useAxiosSecure();
  // const {user} = useContext(AuthContext)

  // const today = new Date();
  // const todayString = today.toISOString().substring(0, 10);

  // const onsubmit = async(formData) => {
  //   if(data?.slot <= 0){
  //     return toast.error("Slot not available")
  //   }
  //   const appointmentData = {
  //     date: formData?.date,
  //     email: user?.email,
  //     name: user?.displayName,
  //     serviceId: data?._id,
  //     serviceTitle: data?.title,
  //     serviceName: data?.name,
  //     coupon: formData?.coupon,
  //     price: data?.price,
  //   }
    
  //   const res = await axiosSecure.post('/appointment', appointmentData)
  //   if(res?.data?.acknowledged){
  //     reset()
  //     toast.success("Appointment updated successfully")
  //     refetch()
  //   }
  // }
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">

          <div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Coupon code
            </label>
            <input
              type="text"
              {...register("coupon")}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter coupon code"
            />
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select appointment date
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
            </div> */}
            <Payment data={data} refetch={refetch} />
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PaymentModal;
