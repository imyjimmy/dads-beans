import * as React from 'react'
import { gql } from '@apollo/client'
import client from '../../apollo-client'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

// /**
//  * SVGR Support
//  * Caveat: No React Props Type.
//  *
//  * You can override the next-env if the type is important to you
//  * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
//  */
// import Vercel from '~/svg/Vercel.svg'

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        products {
          id
          title
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
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <>
          {console.log('products:', products)}
          <section className='bg-white'>
            <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
              {/* <Vercel className='text-5xl' /> */}
            </div>
          </section>
        </>
      </main>
    </Layout>
  )
}
