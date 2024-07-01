'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import { toast, ToastContainer } from 'react-toastify'

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null)

  useEffect(() => {
    const storedCartId = localStorage.getItem('cart_id')

    if (storedCartId) {
      setCartId(storedCartId)
    }
  }, [])

  function updateCartId(newCartId: string) {
    setCartId(newCartId)
    localStorage.setItem('cart_id', newCartId)
  }

  const contextValue = {
    toast,
    cartId,
    updateCartId,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  )
}
