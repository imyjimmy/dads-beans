import { FormEvent, useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { ElementNode } from '@graphcms/rich-text-types'
import { renderPrice } from '@/lib/utils'

import toast, { Toaster } from 'react-hot-toast'
import styles from '@/styles/products.module.css'
import { ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

import { useShoppingCart } from '@/components/ShoppingCartContext'

type PriceVariant = {
  weight: number
  price: number
}

type Picture = {
  fileName: string
  url: string
}

type Product = {
  id: string
  title: string
  subTitle: string
  description: { raw: { children: ElementNode[] } }
  roastDate: string
  roastLevel: string
  priceVariants: PriceVariant[]
  pictures: Picture[]
  thumbnail: Picture
}

type Props = {
  products: Product[]
}

// a pretend data structure called reviews
// const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/* toast 
  src: https://dev.to/franciscomendes10866/how-to-create-a-notificationtoast-using-react-and-tailwind-545o
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
  product: string
  quantity: number
  weight: number
  price: number
  thumbnail: string
}

const Products = ({ products }: Props) => {
  // probably a hack but its data about the product!!
  const [product, setProduct] = useState<Product>()

  const [priceVariant, setPriceVariant] = useState<PriceVariant>()
  //const [weight, setWeight] = useState<number>(12)
  const [quantity, setQuantity] = useState<number | undefined>(1)

  const { _cart, setCart } = useShoppingCart()

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    try {
      if (!priceVariant) {
        throw 'selet a size!'
      }
      if (_cart) {
        let cartItem = _cart.filter(
          (item: CartItem) =>
            product?.title === item.product &&
            priceVariant.weight === item.weight
        ) // we look for a particular cartItem...

        if (cartItem.length > 1) {
          throw 'cart has a duplicate item'
        }
        cartItem = cartItem[0] // by the end of filter and throw ops, there is only one item in cartItem, so can safely re-assign

        setCart([
          ..._cart.filter(
            (item: CartItem) =>
              product?.title !== item.product ||
              priceVariant.weight !== item.weight // we keep these cart items without updating it as they dont match the current item being updated
          ),
          cartItem
            ? { ...cartItem, quantity: cartItem.quantity + quantity } // the matching cartItem exist already so update its quantity
            : {
                // there is no matching cartItem so make a fresh item in the cart
                product: product!.title,
                weight: priceVariant.weight,
                price: priceVariant.price,
                thumbnail: product!.thumbnail.url,
                quantity,
              },
        ])
      } else {
        setCart([
          {
            product: product?.title,
            weight: priceVariant.weight,
            quantity,
            price: priceVariant.price,
            thumbnail: product!.thumbnail.url,
          },
        ])
      }
      notify()
    } catch (e) {
      console.error(e)
    }

    /*
                                                cart.title !=     cart.weight !=
  Cart:                   Item:                 item.title ?      item.weight ?
    December Roast          December Roast      false             true
    12 oz                   16 oz

    December Roast                              false             false
    16 oz
  */
  }

  useEffect(() => {
    if (products && products.length > 0) {
      setProduct(products[0])
      setPriceVariant(products[0].priceVariants[0])
    }
  }, [products])

  if (product == undefined || products === undefined || products.length == 0) {
    return <div>undefined!</div>
  }
  return (
    <>
      {/* {console.log('products!:', products[0])} */}
      {console.log('cart: ', _cart)}
      <Toaster />
      <div className='bg-white'>
        <div className='pt-6'>
          {/* Image gallery */}
          <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
            <div className='aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block'>
              <img
                src={product.pictures[0].url}
                // alt={product.pictures[0].alt}
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
              <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
                <img
                  src={product.pictures[1].url}
                  // alt={product.pictures[1].alt}
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
                <img
                  src={product.pictures[2].url}
                  // alt={product.pictures[2].alt}
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>
            <div className='aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4'>
              <img
                src={product.pictures[3].url}
                // alt={product.pictures[3].alt}
                className='h-full w-full object-cover object-center'
              />
            </div>
          </div>

          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 text-left sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {product?.title}
              </h1>
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

              <form className='mt-10' onSubmit={onSubmit}>
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
                      {' '}
                      Choose a size{' '}
                    </RadioGroup.Label>
                    <div className='grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3'>
                      {product!.priceVariants!.map((priceVariant) => (
                        <RadioGroup.Option
                          key={priceVariant.weight}
                          value={priceVariant}
                          // disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              // size.inStock
                              'cursor-pointer bg-white text-gray-900 shadow-sm',
                              // : 'cursor-not-allowed bg-gray-50 text-gray-200',
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
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-amber-800'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                              />
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
                      value={quantity}
                      onChange={(event) => {
                        setQuantity(
                          event.target.value === ''
                            ? undefined
                            : Number(event.target.value)
                        )
                      }}
                      className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-800 py-3 px-8 text-base font-medium text-white hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8'>
              {/* Description and details */}
              <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <div className='text-base text-gray-900'>
                    <RichText content={product!.description.raw} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
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
