import { Stripe, loadStripe } from '@stripe/stripe-js'
import { getEnv } from './vars'

let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(getEnv('stripePublic'))
  }
  return stripePromise
}

export default getStripe
