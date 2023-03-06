import { FormEvent, useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { renderPrice } from '@/lib/utils'
import { getEnv } from '@/lib/vars'

import toast, { Toaster } from 'react-hot-toast'
import styles from '@/styles/products.module.css'
import Image from 'next/image'
import Link from 'next/link'

import { ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import { useShoppingCart } from 'use-shopping-cart'

import { Product, PriceVariant, ProductProps } from '@/lib/types'

// a pretend data structure called reviews
// const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/*
 *  Toast
 *  src: https://dev.to/franciscomendes10866/how-to-create-a-notificationtoast-using-react-and-tailwind-545o
 */
const notify = (): string =>
  toast.custom(
    (t) => (
      <div
        className={classNames(
          styles.notificationWrapper,
          t.visible ? 'top-0' : '-top-96'
        )}
      >
        <div className={styles.iconWrapper}>
          <ShoppingBagIcon className='h-6 w-6' />
        </div>
        <div className={styles.contentWrapper}>
          <h1>Added to your Cart!</h1>
          <h2>
            <Link href='/cart'>Checkout</Link>
          </h2>
          <p></p>
        </div>
        <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
          <XIcon className='h-6 w-6' />
        </div>
      </div>
    ),
    { id: 'unique-notification', position: 'top-center' }
  )

type CartItem = {
  id: string
  product: string
  quantity: number
  weight: number
  price: number
  thumbnail: string
}

const Products = ({ products, btcPayServer, exchangeRate }: ProductProps) => {
  // probably a hack but its data about the product!!
  const [product, setProduct] = useState<Product>()

  const [priceVariant, setPriceVariant] = useState<PriceVariant>()
  const [btcPrice, setBtcPrice] = useState<number>()
  const [quantity, setQuantity] = useState<number | undefined>(1)

  const { addItem } = useShoppingCart()

  const BTC_DISCOUNT = 0.8

  useEffect(() => {
    /* 100,000,000 sats / price.usd = x sats / 20 usd
      x sats = (100,000,000 / price.usd) * 20
    */
    if (
      exchangeRate &&
      exchangeRate.value &&
      priceVariant &&
      priceVariant.price
    ) {
      setBtcPrice(Math.floor((100000000 / exchangeRate.value) * 20))
      setPriceVariant({
        ...priceVariant!,
        satsPrice: Math.floor(
          ((100000000 / exchangeRate.value) *
            priceVariant!.price *
            BTC_DISCOUNT) /
            100 // price is in cents
        ),
      })
    }
  }, [exchangeRate, priceVariant])

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    console.log('event:', event)
    try {
      if (product && priceVariant && quantity) {
        addItem(
          {
            name: product.name,
            id: product.id,
            price: priceVariant.price,
            currency: 'USD',
            image: product.thumbnail.url,
          },
          { count: quantity, price_metadata: { weight: priceVariant.weight } }
        )
        notify()
      } else {
        throw 'product or variant not set!'
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (products && products.length > 0) {
      setProduct(products[0])
      // hard coded
      setPriceVariant(products[0].priceVariants[0])
    }
  }, [products])

  if (product == undefined || products === undefined || products.length == 0) {
    return <div>undefined!</div>
  }
  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <div className='pt-6'>
          <div className='ml-8 text-left lg:col-span-2 lg:pr-8'>
            <h2 className=''>{product?.name}</h2>
            <h4 className='text-md font-medium text-gray-600'>
              {product?.subtitle}
            </h4>
            <h3 className='sr-only'>Description</h3>
          </div>
          {/* Image gallery */}
          <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
            <div className='aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block'>
              <Image
                src={product.pictures[0].url}
                alt={product.pictures[0].alt ?? ''}
                className='h-full w-full object-cover object-center'
                layout='fill'
              />
            </div>
            <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
              <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
                <Image
                  src={product.pictures[1].url}
                  // alt={product.pictures[1].alt}
                  className='h-full w-full object-cover object-center'
                  layout='fill'
                />
              </div>
              <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
                <Image
                  src={product.pictures[2].url}
                  // alt={product.pictures[2].alt}
                  className='h-full w-full object-cover object-center'
                  layout='fill'
                />
              </div>
            </div>
            <div className='aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4'>
              <Image
                src={product.pictures[3].url}
                alt={product.pictures[3].alt}
                className='h-full w-full object-cover object-center'
                layout='fill'
              />
            </div>
          </div>

          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pt-4 pb-16 text-left sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-10 lg:pb-24'>
            <div className='lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8'>
              {/* Description and details */}
              <div>
                <div className='flex flex-col space-y-8'>
                  <div className='text-base text-gray-900'>
                    <RichText
                      content={product!.description.raw}
                      renderers={{
                        h4: ({ children }) => (
                          <h4 className='my-2 text-2xl font-semibold'>
                            {children}
                          </h4>
                        ),
                        p: ({ children }) => (
                          <p className='font-secondary text-xl'>{children}</p>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {priceVariant ? (
                  <>
                    {renderPrice(priceVariant.price)} | {priceVariant.weight} oz
                  </>
                ) : (
                  <>
                    {renderPrice(product!.priceVariants[0]!.price)} |{' '}
                    {product!.priceVariants[0]!.weight} oz
                  </>
                )}
              </p>
              <h5 className='mt-4'>20% BTC Discount</h5>
              <p className='text-3xl tracking-tight text-gray-900'>
                ~{priceVariant?.satsPrice} sats or{' '}
                {renderPrice(priceVariant!.price * BTC_DISCOUNT)}
              </p>

              <form className='mt-10' method='POST' action={btcPayServer}>
                {/* Sizes */}
                <div className='mt-10'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-medium text-gray-900'>Size</h3>
                  </div>

                  <RadioGroup
                    value={priceVariant}
                    onChange={setPriceVariant}
                    className='mt-4'
                  >
                    <RadioGroup.Label className='sr-only'>
                      Choose a size{' '}
                    </RadioGroup.Label>
                    <div className='grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3'>
                      {product!.priceVariants!.map((priceVariant) => (
                        <RadioGroup.Option
                          key={priceVariant.weight}
                          value={priceVariant}
                          disabled={!priceVariant.inStock}
                          className={({ active }) =>
                            classNames(
                              priceVariant.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-amber-800' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as='span'>
                                {priceVariant.weight} oz
                              </RadioGroup.Label>
                              {priceVariant.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-amber-800'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                />
                              ) : (
                                <span
                                  aria-hidden='true'
                                  className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                                >
                                  <svg
                                    className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                    viewBox='0 0 100 100'
                                    preserveAspectRatio='none'
                                    stroke='currentColor'
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect='non-scaling-stroke'
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className='relative my-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600'>
                    <label
                      htmlFor='quantity'
                      className='absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900'
                    >
                      Quantity
                    </label>
                    <input
                      type='number'
                      name='quantity'
                      id='quantity'
                      disabled={true}
                      value={quantity}
                      onChange={(event) => {
                        setQuantity(
                          event.target.value === ''
                            ? undefined
                            : Number(event.target.value)
                        )
                      }}
                      className='
                      block w-full cursor-not-allowed
                      border-0 bg-gray-50 p-0 text-gray-200 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
                    />
                  </div>
                </div>
                <input
                  type='hidden'
                  name='email'
                  value='customer@example.com'
                />
                <input type='hidden' name='orderId' value='CustomOrderId' />
                <input
                  type='hidden'
                  name='notificationUrl'
                  value='https://example.com/callbacks'
                />
                <input
                  type='hidden'
                  name='redirectUrl'
                  value='https://example.com/thanksyou'
                />
                <button
                  type='submit'
                  name='choiceKey'
                  value='dads beans december roast 16oz'
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-800 py-3 px-8 text-base font-medium text-white hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
                >
                  Buy with Bitcoin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const localStyles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#FFF',
    border: '1px solid #ebebeb',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
    // maxWidth: '500px',
    // padding: '36px',
    // height: '550px',
    // marginBottom: '40px',
    // display: 'flex',
    // flexDirection: 'column',
    // marginLeft: ' 8px',
    // marginRight: '8px',
  },
}

export default Products

{
  /* Reviews */
  // import StarIcon from '@heroicons/react/solid/StarIcon'
}
{
  /* <div className='mt-6'>
  <h3 className='sr-only'>Reviews</h3>
  <div className='flex items-center'>
    <div className='flex items-center'>
      {[0, 1, 2, 3, 4].map((rating) => (
        <StarIcon
          key={rating}
          className={classNames(
            reviews.average > rating
              ? 'text-gray-900'
              : 'text-gray-200',
            'h-5 w-5 flex-shrink-0'
          )}
          aria-hidden='true'
        />
      ))}
    </div>
    <p className='sr-only'>{reviews.average} out of 5 stars</p>
    <a
      href={reviews.href}
      className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
    >
      {reviews.totalCount} reviews
    </a>
  </div>
</div> */
}
