import { useState, useEffect } from 'react'
import StarIcon from '@heroicons/react/solid/StarIcon'
import { RadioGroup } from '@headlessui/react'

import { renderPrice } from '@/lib/utils'

type PriceVariant = {
  weight: number
  price: number
}

type Product = {
  id: string
  title: string
  subTitle: string
  description: { raw: string }
  roastDate: string
  roastLevel: string
  priceVariants: PriceVariant[]
}

type Props = {
  products: Product[]
}

// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//     { name: '2XL', inStock: true },
//     { name: '3XL', inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
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

  return (
    <>
      {console.log('products:', products)}
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
                {renderPrice(product?.priceVariants[0].price!)} |{' '}
                {product?.priceVariants[0].weight} oz
              </p>

              {/* Reviews */}
              <div className='mt-6'>
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
              </div>

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
                      {product?.priceVariants.map((priceVariant) => (
                        <RadioGroup.Option
                          key={priceVariant.weight}
                          value={size}
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
                    {/* {product?.description} */}
                  </p>
                </div>
              </div>

              {/* <div className='mt-10'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Highlights
                </h3>

                <div className='mt-4'>
                  <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className='text-gray-400'>
                        <span className='text-gray-600'>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>Details</h2>

                <div className='mt-4 space-y-6'>
                  <p className='text-sm text-gray-600'>{product.details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
