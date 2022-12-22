import { NextPage } from 'next'
import Layout from '@/components/layout/Layout'
import CheckoutForm from '@/components/CheckoutForm'

const CartPage: NextPage = () => {
  return (
    <Layout title='Cart'>
      <div className='page-container'>
        <CheckoutForm />
      </div>
    </Layout>
  )
}

export default CartPage
