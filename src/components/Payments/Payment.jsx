import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckOutForm"



const stripePromise = loadStripe(import.meta.env.VITE_LOAD_STRIPE)
const Payment = ({data}) => {
  return (
    <div>
        <div>
            <input type="date" />
            <Elements stripe={stripePromise}>
              <CheckoutForm data={data} />
            </Elements>
        </div>
    </div>
  )
}

export default Payment