import React, { ChangeEvent, MouseEvent, useState, useEffect } from 'react'

import { useShoppingCart } from 'use-shopping-cart'
// import { CheckIcon, ClockIcon } from '@heroicons/react/solid'
// import CustomDonationInput from '@/components/CustomDonationInput'
// import StripeTestCards from '@/components/StripeTestCards'
// import getStripe from '@/lib/get-stripe'
import { fetchPostJSON } from '@/lib/api'
import { renderPrice } from '@/lib/utils'

// import Button from '@/components/buttons/Button'
import { ImSpinner2 } from 'react-icons/im'

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
  const [cartEmpty, setCartEmpty] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const {
    formattedTotalPrice,
    cartCount,
    cartDetails,
    redirectToCheckout,
    removeItem,
    setItemQuantity,
  } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const changeItemQuantity: (
    key: string
  ) => React.ChangeEventHandler<HTMLSelectElement> =
    (key: string) => (event: ChangeEvent<HTMLSelectElement>) => {
      console.log('onChange:', event.target.value)
      setItemQuantity(key, Number(event.target.value))
    }

  const handleRemoveItem: (
    key: string
  ) => React.MouseEventHandler<HTMLButtonElement> =
    (key: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      removeItem(key)
    }

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    )

    if (response.statusCode > 399) {
      console.error(response.message)
      setErrorMessage(response.message)
      setLoading(false)
      return
    }

    redirectToCheckout(response.id)
  }

  return (
    <>
      {console.log('cartDetails:', cartDetails)}
      <div className='mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
          Shopping Cart
        </h1>

        <form className='mt-12' onSubmit={handleCheckout}>
          <div>
            <h2 className='sr-only'>Items in your shopping cart</h2>

            <ul
              role='list'
              className='divide-y divide-gray-200 border-t border-b border-gray-200'
            >
              {cartDetails &&
                Object.keys(cartDetails).map((key: string, index: number) => {
                  const price_data: { weight: string } = cartDetails[key]
                    .price_data as { weight: string }
                  return (
                    <li key={index} className='flex py-6 sm:py-10'>
                      <div className='flex-shrink-0'>
                        <img
                          src={cartDetails[key].image}
                          // alt={product.imageAlt}
                          className='h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32'
                        />
                      </div>

                      <div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                        <div>
                          <div className='flex justify-between sm:grid sm:grid-cols-2'>
                            <div className='pr-6'>
                              <h3 className='text-sm'>
                                {/* <a
                              href={product.href}
                              className='font-medium text-gray-700 hover:text-gray-800'
                            > */}
                                {cartDetails[key].name}
                                {/* </a> */}
                              </h3>
                              {/* <p className='mt-1 text-sm text-gray-500'>
                            {product.color}
                          </p> */}
                              {cartDetails[key].price_data ? (
                                <p className='mt-1 text-sm text-gray-500'>
                                  {price_data['weight']} oz
                                </p>
                              ) : null}
                            </div>

                            <p className='text-right text-sm font-medium text-gray-900'>
                              {renderPrice(
                                cartDetails[key].price *
                                  cartDetails[key].quantity
                              )}
                            </p>
                          </div>

                          <div className='mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block'>
                            <label
                              htmlFor={`quantity-${index}`}
                              className='sr-only'
                            >
                              Quantity, {cartDetails[key].name}
                            </label>
                            <select
                              value={cartDetails[key].quantity}
                              id={`quantity-${index}`}
                              name={`quantity-${index}`}
                              onChange={changeItemQuantity(key)}
                              className='block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-yellow-800 focus:outline-none focus:ring-1 focus:ring-yellow-600 sm:text-sm'
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>

                            <button
                              type='button'
                              className='ml-4 text-sm font-medium text-yellow-900 hover:text-yellow-700 sm:ml-0 sm:mt-3'
                              onClick={handleRemoveItem(key)}
                            >
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
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
                          : `Ships in ${product.leadTime}`}
                      </span>
                    </p> */}
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>

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
                    {formattedTotalPrice}
                  </dd>
                </div>
              </dl>
              <p className='mt-1 text-sm text-gray-500'>
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>

            <div className='mt-10'>
              <button
                //isLoading={loading}
                type='submit'
                className='w-full rounded-md border border-transparent bg-yellow-900 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50'
              >
                {loading ? (
                  <div className={'bg-yellow-900'}>
                    <ImSpinner2 className='mx-auto animate-spin' />
                  </div>
                ) : (
                  <>Checkout</>
                )}
              </button>
            </div>

            <div className='mt-6 text-center text-sm'>
              <p>
                or {''}
                <a
                  href='#'
                  className='font-medium text-yellow-900 hover:text-yellow-700'
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
