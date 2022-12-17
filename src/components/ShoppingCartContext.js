import { createContext, useContext, useEffect, useState } from 'react'

const ShoppingCartContext = createContext()
const useShoppingCart = () => useContext(ShoppingCartContext)

/*
  Cart: CartItem[]
  CartItem: {
    product: string
    quantity: number
    user?
  }
*/

const ShoppingCartProvider = ({ children }) => {
  let localCart

  if (typeof window !== 'undefined') {
    localCart = JSON.parse(localStorage.getItem('localCart'))
  }

  const [_cart, setCart] = useState(localCart)

  useEffect(() => {
    console.log('setting cart')
    if (_cart && _cart.length != 0) {
      localStorage.setItem('localCart', JSON.stringify(_cart))
    }
  }, [_cart])

  const values = {
    _cart,
    setCart,
  }

  return (
    <ShoppingCartContext.Provider value={values}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export { useShoppingCart, ShoppingCartProvider }
