import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckOutForm"



const stripePromise = loadStripe(import.meta.env.VITE_LOAD_STRIPE)
const Payment = ({data, refetch}) => {
  return (
    <div>
        
            <Elements stripe={stripePromise}>
              <CheckoutForm data={data} refetch={refetch} />
            </Elements>
        
    </div>
  )
}

export default Payment