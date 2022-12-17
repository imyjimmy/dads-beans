import React, { useState, useEffect } from 'react'

import { useShoppingCart } from '@/components/ShoppingCartContext'
import { CheckIcon, ClockIcon } from '@heroicons/react/solid'

import CustomDonationInput from '@/components/CustomDonationInput'
import StripeTestCards from '@/components/StripeTestCards'

import getStripe from '@/lib/get-stripe'
import { fetchPostJSON } from '@/lib/api'
import { formatAmountForDisplay, renderPrice } from '@/lib/utils'

//<configs>
export const CURRENCY = 'usd'
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0
//</configs>

type CartItem = {
  product: string
  quantity: number
  weight: number
  thumbnail: string
  price: number
}

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: Math.round(MAX_AMOUNT / AMOUNT_STEP),
  })

  const { _cart } = useShoppingCart()

  const [cart, setCart] = useState<CartItem[]>()
  const [subTotalPrice, setSubTotalPrice] = useState<number>(0)

  useEffect(() => {
    setCart(_cart)
    let price = 0
    console.log('hey')
    _cart.map((item: CartItem) => (price += item.price))
    setSubTotalPrice(price)
  }, [_cart])

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation,
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <>
      {console.log('cart:', cart)}
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0'>
        <h1 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>

        <form className='mt-12'>
          <section aria-labelledby='cart-heading'>
            <h2 id='cart-heading' className='sr-only'>
              Items in your shopping cart
            </h2>
            <ul
              role='list'
              className='divide-y divide-gray-200 border-t border-b border-gray-200'
            >
              {cart &&
                cart.map((item: CartItem, index: number) => (
                  <li key={index} className='flex py-6'>
                    <div className='flex-shrink-0'>
                      <img
                        src={item.thumbnail}
                        // alt={item.imageAlt}
                        className='h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32'
                      />
                    </div>

                    <div className='ml-4 flex flex-1 flex-col sm:ml-6'>
                      <div>
                        <div className='flex justify-between'>
                          <h4 className='text-sm'>
                            <a
                              href={'/#'} //product.href
                              className='font-medium text-gray-700 hover:text-gray-800'
                            >
                              {item.product}
                            </a>
                          </h4>
                          <p className='ml-4 text-sm font-medium text-gray-900'>
                            {renderPrice(item.price)}
                          </p>
                        </div>
                        {/* <p className='mt-1 text-sm text-gray-500'>
                        {product.color}
                      </p> */}
                        <p className='mt-1 text-sm text-gray-500'>
                          {item.weight} oz
                        </p>
                      </div>

                      <div className='mt-4 flex flex-1 items-end justify-between'>
                        {/* <p className='flex items-center space-x-2 text-sm text-gray-700'>
                        {product.inStock ? (
                          <CheckIcon
                            className='h-5 w-5 flex-shrink-0 text-green-500'
                            aria-hidden='true'
                          />
                        ) : (
                          <ClockIcon
                            className='h-5 w-5 flex-shrink-0 text-gray-300'
                            aria-hidden='true'
                          />
                        )}

                        <span>
                          {product.inStock
                            ? 'In stock'
                            : `Will ship in ${product.leadTime}`}
                        </span>
                      </p> */}
                        <div className='ml-4'>
                          <button
                            type='button'
                            className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby='summary-heading' className='mt-10'>
            <h2 id='summary-heading' className='sr-only'>
              Order summary
            </h2>

            <div>
              <dl className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <dt className='text-base font-medium text-gray-900'>
                    Subtotal
                  </dt>
                  <dd className='ml-4 text-base font-medium text-gray-900'>
                    {renderPrice(subTotalPrice)}
                  </dd>
                </div>
              </dl>
              <p className='mt-1 text-sm text-gray-500'>
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>

            <div className='mt-10'>
              <button
                type='submit'
                className='w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
              >
                Checkout
              </button>
            </div>

            <div className='mt-6 text-center text-sm'>
              <p>
                or
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Continue Shopping
                  <span aria-hidden='true'> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </>
  )
}

export default CheckoutForm

{
  /*<form onSubmit={handleSubmit}>
      <CustomDonationInput
        className='checkout-style'
        name={'customDonation'}
        value={input.customDonation}
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        step={AMOUNT_STEP}
        currency={CURRENCY}
        onChange={handleInputChange}
      />
      <StripeTestCards />
      <button
        className='checkout-style-background'
        type='submit'
        disabled={loading}
      >
        Donate {formatAmountForDisplay(input.customDonation, CURRENCY)}
      </button>
    </form> */
}
