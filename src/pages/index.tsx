import * as React from 'react'
import { gql } from '@apollo/client'
import client from '../../apollo-client'

import Layout from '@/components/layout/Layout'
import Products from '@/components/Products'
import NextImage from '@/components/NextImage'

import { getEnv } from '@/lib/vars'
import { ProductProps } from '@/lib/types'

// import Image from 'next/image'

// import Seo from '@/components/Seo'

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Vercel from '~/svg/Vercel.svg'

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        products {
          id
          name
          subtitle
          description {
            raw
          }
          roastDate
          roastLevel
          priceVariants {
            weight
            price
            inStock
          }
          pictures {
            fileName
            url
            alt
          }
          thumbnail {
            fileName
            url
            alt
          }
        }
      }
    `,
  })
  const COINGECKO_API = 'https://api.coingecko.com/api/v3/exchange_rates'
  const coingeckoPrice = await fetch(COINGECKO_API)
  let price = await coingeckoPrice.json()
  console.log('price:', price.rates.usd)
  const btcPayServer = getEnv('btcPayServer')

  return {
    props: {
      products: data.products,
      btcPayServer,
      exchangeRate: price.rates.usd,
    },
  }
}

export default function HomePage({
  products,
  btcPayServer,
  exchangeRate,
}: ProductProps) {
  return (
    <Layout>
      <main>
        <section>
          <div className='relative px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl pt-16 pb-12 sm:pt-32 sm:pb-24'>
              <div>
                <h1 className='text-4xl font-bold tracking-tight sm:text-center sm:text-6xl'>
                  Home Roasted Coffee Beans
                </h1>
                <h2 className='mt-6 sm:text-center'>
                  Made in Small Batches by My Dad
                </h2>
                <p className='mt-6 font-secondary text-2xl leading-8 text-gray-800 sm:text-center'></p>

                <div className='mt-8 sm:mb-8 sm:flex sm:justify-center'>
                  {/* <div className='relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                    <span className='font-secondary text-base text-gray-800'>
                      My Dad is roasting dreams while roasting beans!{' '}
                      <a href='#' className='font-semibold text-yellow-800'>
                        <span className='absolute inset-0' aria-hidden='true' />
                        Sign up
                      </a>{' '}
                      for a monthly roast delivered to your inbox
                    </span>
                  </div> */}

                  <NextImage
                    useSkeleton
                    className='w-2/5'
                    src='/images/dad-roast.jpg'
                    width='390'
                    height='691'
                    alt='dad-roasting'
                    style={{
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                {/* <div className='mt-8 flex gap-x-4 sm:justify-center'>
                  <a
                    href='#'
                    className='inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700'
                  >
                    Sign up for a 
                    <span className='text-indigo-200' aria-hidden='true'>
                      &rarr;
                    </span>
                  </a>
                  <a
                    href='#'
                    className='inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'
                  >
                    Live demo
                    <span className='text-gray-400' aria-hidden='true'>
                      &rarr;
                    </span>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className='flex min-h-screen flex-col items-center text-center'>
            <Products
              products={products}
              btcPayServer={btcPayServer}
              exchangeRate={exchangeRate}
            />
          </div>
        </section>
      </main>
    </Layout>
  )
}
