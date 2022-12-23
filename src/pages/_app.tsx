import { AppProps } from 'next/app'
import { getEnv } from '../lib/vars'
import { Amplify } from 'aws-amplify'
import { UserProvider } from '../lib/UserProvider'
import { useFetchUser } from '../lib/user'
import { CartProvider } from 'use-shopping-cart'

import '@/styles/globals.css'
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

Amplify.configure({
  Auth: {
    region: getEnv('awsRegion'),
    userPoolId: getEnv('userPoolId'),
    userPoolWebClientId: getEnv('userPoolWebClientId'),
  },
  ssr: true,
})

function MyApp({ Component, pageProps }: AppProps) {
  // const { user, loading } = useFetchUser()
  return (
    <>
      <CartProvider
        cartMode='checkout-session'
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        currency='USD'
        shouldPersist={true}
        loading={<p aria-live='polite'>Loading redux-persist...</p>}
      >
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}

export default MyApp
