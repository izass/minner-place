import { createContext, useContext } from 'react'
import { toast } from 'react-toastify'

export type AppContext = {
  toast: typeof toast
  cartId: string | null
  updateCartId: (cartId: string) => void
}

export const AppContext = createContext<AppContext | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}
