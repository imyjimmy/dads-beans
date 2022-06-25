import { ApolloClient, InMemoryCache } from '@apollo/client'
import { getEnv } from './utils/vars'

const client = new ApolloClient({
  uri: getEnv('graphqlApi'), //localhost for now
  cache: new InMemoryCache(),
})

export default client
