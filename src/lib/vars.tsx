import { Amplify } from 'aws-amplify'

// restart dev server to see changes take effect
const devKeys: { [keyName: string]: string } = {
  awsRegion: process!.env!.AWS_REGION!,
  userPoolId: process!.env!.AWS_USER_POOL_ID!,
  userPoolWebClientId: process!.env!.AWS_WEB_CLIENT_ID!,
  graphqlApi: process!.env!.HYGRAPH_CONTENT_API!,
  authToken: process!.env!.HYGRAPH_DEVELOPMENT!,
  stripePublic: process!.env!.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  stripeSecret: process!.env!.STRIPE_SECRET_KEY!,
}

const prodKeys: { [keyName: string]: string } = {
  awsRegion: process!.env!.AWS_REGION!,
  userPoolId: process!.env!.AWS_USER_POOL_ID!,
  userPoolWebClientId: process!.env!.AWS_WEB_CLIENT_ID!,
  graphqlApi: process!.env!.HYGRAPH_CONTENT_API!,
  authToken: process!.env!.HYGRAPH_PRODUCTION!,
  stripePublic: process!.env!.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  stripeSecret: process!.env!.STRIPE_SECRET_KEY!,
}

// check enviroment if development || production
const getEnv = (requestedKey: string) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return devKeys[requestedKey]
  } else {
    return prodKeys[requestedKey]
  }
}

const amplify = Amplify.configure({
  Auth: {
    region: getEnv('awsRegion'),
    userPoolId: getEnv('userPoolId'),
    userPoolWebClientId: getEnv('userPoolWebClientId'),
  },
  ssr: true,
})

export { getEnv, amplify }
