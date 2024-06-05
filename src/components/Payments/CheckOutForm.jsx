import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react"
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from "../../providers/AuthProvider";


const CheckOutForm = ({data}) => {
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const {user} = useContext(AuthContext);


    useEffect(() => {
        if(data.slot > 0){
            axiosSecure.post('/create-payment-intent', {price: data?.price})
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
        }
    },[data, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);

        if(card == null){
            return
        }

        const {error: paymentError, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        })

        if(paymentError){
            console.log(error.message);
            setError(paymentError.message)
        }else{
            console.log("[PaymentMethod]", paymentMethod);
            setError("")
        }

        const {paymentIntent, error: paymentIntentError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                },
            }
        })

        if(paymentIntentError){
            console.log(error.message);
            setError(paymentIntentError.message)
        }else{
            console.log("[PaymentIntent]", paymentIntent);
            setError("")
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <CardElement options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }} />
        <p className="text-red-600">{error}</p>
        <button type="submit" disabled={!stripe || !clientSecret}>Pay</button>
    </form>
  )
}

export default CheckOutForm