import * as React from 'react'
import { gql } from '@apollo/client'
import client from '../../apollo-client'

import Layout from '@/components/layout/Layout'
import Products from '@/components/Products'
import Seo from '@/components/Seo'

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

  return {
    props: {
      products: data.products,
    },
  }
}

export default function HomePage({ products }: any) {
  return (
    <Layout>
      <main>
        <section>
          <div className='relative px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl pt-20 pb-24 sm:pt-48 sm:pb-32'>
              <div>
                <h1 className='text-4xl font-bold tracking-tight sm:text-center sm:text-6xl'>
                  Roasting Dreams While Roasting Beans
                </h1>
                <p className='mt-6 text-lg leading-8 text-gray-600 sm:text-center'>
                  Home-roasted coffee beans made in small batches by my dad. Get
                  life advice in roast form and motivation in bean form.
                </p>

                <div className='mt-8 hidden sm:mb-8 sm:flex sm:justify-center'>
                  <div className='relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                    <span className='text-gray-800'>
                      <a href='#' className='font-semibold text-yellow-800'>
                        <span className='absolute inset-0' aria-hidden='true' />
                        Sign up
                      </a>{' '}
                      for a weekly roast delivered to your inbox, but promise
                      not to be offended 🤝
                    </span>
                  </div>
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
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <Products products={products} />
          </div>
        </section>
      </main>
    </Layout>
  )
}
