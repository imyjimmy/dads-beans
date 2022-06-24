import { useState, useEffect } from 'react'
import { checkUserStatus } from './auth'

export async function fetchUser() {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user
  }

  const userResponse = await checkUserStatus()

  if (!userResponse) {
    delete window.__user
    return null
  }

  return {
    email: userResponse.attributes.email,
    sub: userResponse.attributes.sub,
  }
}

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState()
  const [user, setUser] = useState()

  useEffect(
    () => {
      if (!loading && user) {
        return
      }
      setLoading(true)
      let isMounted = true

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = '/login'
            return
          }
          setUser(user)
          setLoading(false)
        }
      })

      return () => {
        isMounted = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { user, loading }
}
