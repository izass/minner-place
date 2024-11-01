import { useCallback, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../context/AppContext'
import axios from 'axios'
import { getCarts } from '../service/carts'
import { Cart } from '../components/domain/api/carts'

export const useCart = () => {
  const [openModal, setOpenModal] = useState(false)
  const [cartItems, setCartItems] = useState({} as Cart)
  const queryClient = useQueryClient()

  const { cartId, toast } = useAppContext()

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCarts(cartId),
    enabled: !!cartId,
    select: useCallback((data) => {
      setCartItems(data)
      return data
    }, []),
  })

  const clearCart = useCallback(() => {
    if (!cart?.id) {
      return
    }

    const mappedClearedCartItems = cart?.line_items?.map((item) => ({
      product_id: item?.product?.id,
      quantity: 0,
    }))

    axios.put(`http://localhost:4000/carts/${cart.id}`, {
      line_items_attributes: mappedClearedCartItems,
    })

    setCartItems((state) => ({
      ...state,
      line_items: [],
    }))

    queryClient.invalidateQueries({ queryKey: ['cart'] })
    toast('Cart cleared!')
  }, [cart, queryClient, toast])

  const handleOpenModal = () => setOpenModal(true)
  const closeModal = () => setOpenModal(false)

  const isEmpty = !cartItems?.line_items?.length

  return {
    isEmpty,
    clearCart,
    cart: cartItems,
    openModal,
    handleOpenModal,
    closeModal,
    setCartItems,
  }
}
