import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { ElementNode } from '@graphcms/rich-text-types'
import { renderPrice } from '@/lib/utils'

type PriceVariant = {
  weight: number
  price: number
}

type Product = {
  id: string
  title: string
  subTitle: string
  description: { raw: { children: ElementNode[] } }
  roastDate: string
  roastLevel: string
  priceVariants: PriceVariant[]
}

type Props = {
  products: Product[]
}

// a pretend data structure called reviews
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Products = ({ products }: Props) => {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const [size, setSize] = useState<number>()
  const [quantity, setQuantity] = useState<number>()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    if (products && products.length > 0) {
      setProduct(products[0])
    }
  }, [products])

  if (product == undefined || products === undefined || products.length == 0) {
    return <div>undefined!</div>
  }
  return (
    <>
      {/* {console.log('products!:', products[0].priceVariants[0].price)} */}
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'></div>
      <div className='bg-white'>
        <div className='pt-6'>
          {/* Image gallery */}
          {/* <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
            <div className='aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block'>
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
              <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
                <img
                  src={product.images[1].src}
                  alt={product.images[1].alt}
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
                <img
                  src={product.images[2].src}
                  alt={product.images[2].alt}
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>
            <div className='aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4'>
              <img
                src={product.images[3].src}
                alt={product.images[3].alt}
                className='h-full w-full object-cover object-center'
              />
            </div>
          </div> */}

          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {size
                  ? renderPrice(
                      product!.priceVariants.filter(
                        (variant) => variant.weight == size
                      )[0].price
                    )
                  : renderPrice(product!.priceVariants[0]!.price)}{' '}
                | {size ?? product!.priceVariants[0]!.weight} oz
              </p>

              <form className='mt-10'>
                {/* Sizes */}
                <div className='mt-10'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-medium text-gray-900'>Size</h3>
                  </div>

                  <RadioGroup value={size} onChange={setSize} className='mt-4'>
                    <RadioGroup.Label className='sr-only'>
                      {' '}
                      Choose a size{' '}
                    </RadioGroup.Label>
                    <div className='grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3'>
                      {product!.priceVariants!.map((priceVariant) => (
                        <RadioGroup.Option
                          key={priceVariant.weight}
                          value={priceVariant.weight}
                          // disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              // size.inStock
                              'cursor-pointer bg-white text-gray-900 shadow-sm',
                              // : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as='span'>
                                {priceVariant.weight} oz
                              </RadioGroup.Label>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type='submit'
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8'>
              {/* Description and details */}
              <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <p className='text-base text-gray-900'>
                    <RichText content={product!.description.raw} />
                  </p>
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
