import { useCallback, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../context/AppContext'
import axios from 'axios'
import { getCarts } from '../service/carts'

export const useCart = () => {
  const [openModal, setOpenModal] = useState(false)
  const [cartItems, setCartItems] = useState(null)
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

    queryClient.invalidateQueries({ queryKey: ['cart'] })
    toast('Cart cleared!')
  }, [cart, queryClient, toast])

  const handleOpenModal = () => setOpenModal(true)
  const closeModal = () => setOpenModal(false)

  const isEmpty = !cart?.line_items?.length


  return {
    isEmpty,
    clearCart,
    cart: cartItems,
    openModal,
    handleOpenModal,
    closeModal,
    setCartItems
  }
}
