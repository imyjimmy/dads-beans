import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()
const useUser = () => useContext(UserContext)

const UserProvider = ({ value, children }) => {
  const [user, setUser] = useState()

  // example of interacting w localStorage
  let localUser

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let _user = localStorage.getItem('user')
      if (_user !== 'undefined') {
        localUser = JSON.parse(_user)
      }
    }
    console.log('localuser', localUser)
    setUser(localUser)
  }, [])

  useEffect(() => {
    if (user !== undefined) {
      console.log('user setItem:', user)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    if (value && value.user) {
      setUser(value.user)
    }
  }, [value])

  const values = {
    user,
    setUser,
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export { useUser, UserProvider }
