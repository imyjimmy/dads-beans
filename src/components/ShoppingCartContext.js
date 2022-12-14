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
  const [cart, setCart] = useState()

  const values = {
    cart,
    setCart,
  }

  return (
    <ShoppingCartContext.Provider value={values}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export { useShoppingCart, ShoppingCartProvider }
