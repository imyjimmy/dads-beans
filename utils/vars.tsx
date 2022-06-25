import { Amplify } from 'aws-amplify'

// restart dev server to see changes take effect
const devKeys: { [keyName: string]: string } = {
  awsRegion: 'us-east-1',
  userPoolId: 'us-east-1_WFqe8bYWp',
  userPoolWebClientId: '1h98jbb3founicqlhf2n215puq',
  graphqlApi: process!.env!.GRAPHQL_API!,
}

const prodKeys: { [keyName: string]: string } = {
  awsRegion: 'us-east-1',
  userPoolId: 'us-east-1_WFqe8bYWp',
  userPoolWebClientId: '1h98jbb3founicqlhf2n215puq',
  graphqlApi: '',
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
