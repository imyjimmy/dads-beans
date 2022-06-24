import { Amplify } from "aws-amplify";

const devKeys: { [keyName: string] : string } = {
  'awsRegion': 'us-east-1',
  'userPoolId': 'us-east-1_WFqe8bYWp',
  'userPoolWebClientId': '1h98jbb3founicqlhf2n215puq'
}

const prodKeys: { [keyName: string] : string } = {
  'awsRegion': 'us-east-1',
  'userPoolId': 'us-east-1_WFqe8bYWp',
  'userPoolWebClientId': '1h98jbb3founicqlhf2n215puq'
}

// check enviroment if development || production
const getEnv = (requestedKey: string) => {
  if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
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
  }, ssr: true
});

export { getEnv, amplify }