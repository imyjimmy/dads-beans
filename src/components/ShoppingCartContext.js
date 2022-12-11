import { createContext, useContext, useEffect, useState } from 'react'

const ShoppingCartContext = createContext()
const useShoppingCart = () => useContext(ShoppingCartContext)

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
