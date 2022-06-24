import React from 'react'
import { AppProps } from 'next/app'
import { getEnv } from '../utils/vars'
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { AuthenticatorProps } from '@aws-amplify/ui-react/dist/types/components/Authenticator/Authenticator';
import { Amplify } from "aws-amplify"

import '../styles/index.css'

Amplify.configure({
  Auth: {
    region: getEnv('awsRegion'),
    userPoolId: getEnv('userPoolId'),
    userPoolWebClientId: getEnv('userPoolWebClientId'),
  }, ssr: true
})

type MyApp = AppProps & AuthenticatorProps

function MyApp({ Component, pageProps }: MyApp) { // signOut, user
  return <Component {...pageProps} />
}

export default MyApp
// export default withAuthenticator(MyApp);