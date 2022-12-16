import { AppProps } from 'next/app'
import { getEnv } from '../lib/vars'
import { Amplify } from 'aws-amplify'
import { UserProvider } from '../lib/UserProvider'
import { useFetchUser } from '../lib/user'

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
  const { user, loading } = useFetchUser()
  return (
    <>
      {/* {console.log('user from useFetchUser', user)} */}
      <UserProvider value={user}>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
