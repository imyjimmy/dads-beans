import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'
import PrintObject from '@/lib/PrintObject'

import { useShoppingCart } from 'use-shopping-cart'
// import Cart from '../components/Cart'
// import ClearCart from '@/components/ClearCart'

import { fetchGetJSON } from '@/lib/api'
import useSWR from 'swr'

const ResultPage: NextPage = () => {
  const router = useRouter()
  const { cartDetails, clearCart } = useShoppingCart()

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  const cartSummary = structuredClone(cartDetails)

  // useEffect(() => {
  //   clearCart()
  // }, [cartSummary])

  if (error) return <div>failed to load</div>

  return (
    <>
      {console.log('data:', data, 'error:', error)}
      <Layout title='Checkout Payment Result | Next.js + TypeScript Example'>
        <div className='page-container'>
          <h1>Checkout Payment Result</h1>
          <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
          <h3>CheckoutSession response:</h3>
          <PrintObject content={data?.shipping_details ?? 'loading...'} />
          <PrintObject content={cartSummary! ?? 'loading...'} />
          {/* <Cart>
            <ClearCart />
          </Cart> */}
        </div>
      </Layout>
    </>
  )
}

export default ResultPage
