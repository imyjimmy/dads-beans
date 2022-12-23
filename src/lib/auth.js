import { Auth } from 'aws-amplify'

export const checkUserStatus = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return user
  } catch (error) {
    console.error(error)
  }
}

export const signIn = async (username) => {
  try {
    const user = await Auth.signIn(username)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const signUp = async (username, password) => {
  let userAttributes = null
  let emailRegex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
  if (emailRegex.test(username)) {
    userAttributes = {
      email: username,
    }
  } else {
    userAttributes = {
      phone_number: username,
    }
  }

  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: userAttributes,
    })
    return user
  } catch (error) {
    throw new Error(error)
  }
}

export async function answerCustomChallenge(cognitoUser, code) {
  const answerResponse = await Auth.sendCustomChallengeAnswer(cognitoUser, code)
  try {
    // confirm user is logged in
    await Auth.currentSession()
    return answerResponse
  } catch (error) {
    console.error('Apparently the user did not enter the right code', error)
  }
}

export const signOut = async () => {
  try {
    await Auth.signOut()
  } catch (error) {
    console.error(error)
  }
}

export const globalSignOut = async () => {
  try {
    await Auth.signOut({ global: true })
  } catch (error) {
    console.error(error)
  }
}
