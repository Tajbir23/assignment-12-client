import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../Loading";

const CheckOutForm = ({ data, refetch }) => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    coupon: "",
    date: null,
    time: "",
  });
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const todayString = today.toISOString().substring(0, 10);

  useEffect(() => {
    if (data?.slot > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: data?.price,
          discountedPrice: Number(discount),
          serviceId: data?._id,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [data, axiosSecure, discount]);

  const handleCouponCheck = (e) => {
    e.preventDefault();
    console.log('click')
    if (formData?.coupon) {
      console.log(formData?.coupon);
      axiosSecure
        .post("/check-coupon", { coupon: formData?.coupon })
        .then((res) => {
          console.log(res.data);
          setCouponError(res.data.message);
          setDiscount(res?.data?.rate);
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        setLoading(false)
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        setLoading(false)
        return;
      }

      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: card,
        });

      if (paymentError) {
        console.log(error.message);
        console.log(error)
        setError(paymentError.message);
        setLoading(false)
        return;
      } else {
        console.log("[PaymentMethod]", paymentMethod);

        setError("");
      }

      const { paymentIntent, error: paymentIntentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "anonymous",
            },
          },
        });

      if (paymentIntentError) {
        console.log(error.message);
        console.log(error)
        setError(paymentIntentError.message);
        setLoading(false)
      } else {
        console.log("[PaymentIntent]", paymentIntent);
        setError("");
      }

      if (paymentIntent?.status === "succeeded") {
        if (data?.slot <= 0) {
          return toast.error("Slot not available");
        }
        
        const timeStamp = new Date(formData?.date).getTime();

        const appointmentData = {
          date: Number(timeStamp),
          slot: data?.slot,
          name: user?.displayName || "anonymous",
          email: user?.email || "anonymous",
          serviceId: data?._id,
          serviceTitle: data?.title,
          serviceName: data?.name,
          coupon: formData?.coupon,
          price: discount,
          withOutDiscount: data?.price,
          time: formData?.time,
        };

        const res = await axiosSecure.post("/appointment", appointmentData);
        if (res?.data?.acknowledged) {
          setLoading(false)
          toast.success("Appointment updated successfully");
          refetch();
          setFormData({coupon: "", date: null, time: ""})
        }
      } else {
        setLoading(false)
        toast.error("Payment failed");
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleCouponCheck} className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Coupon code
        </label>
        <div className="flex gap-5">
          <div>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, coupon: e.target.value })
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter coupon code"
            />
            {couponError && (
              <p
                className={
                  couponError === "coupon not found"
                    ? "text-red-600"
                    : "text-green-700"
                }
              >
                {couponError}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-secondary">
            Apply Coupon
          </button>
        </div>
      </form>
      <form onSubmit={handleSubmit} >
      {loading && <div className="top-0 bottom-0 bg-white w-full h-screen fixed z-[999]">
        <Loading />
      </div>}
        <label className="block text-md mb-5 font-medium text-gray-700">
          Enter card details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                "::placeholder": {
                  color: "#a0aec0",
                  fontStyle: "italic",
                },
                iconColor: "#c4f0ff",
                letterSpacing: "0.025em",
                lineHeight: "1.5em",
                padding: "10px 14px",
                border: "1px solid #ccd0d2",
                borderRadius: "4px",
                backgroundColor: "#f8f9fa",
                boxShadow: "0 1px 3px 0 #e6ebf1",
                transition: "box-shadow 150ms ease",
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
              complete: {
                color: "#4caf50",
                iconColor: "#4caf50",
              },
            },
          }}
        />

        <p className="text-red-600 mb-5">{error}</p>
        <div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Select appointment date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min={todayString}
              placeholder="Enter date"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Select appointment time
            </label>
            <input
              type="time"
              required
              value={formData.time}
              min="09:00"
              max="18:00"
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter time"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!stripe || !clientSecret || data?.slot <= 0}
        >
          Book now
        </button>
      </form>
    </>
  );
};

export default CheckOutForm;
