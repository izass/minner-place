'use client'

import { TiShoppingCart } from 'react-icons/ti'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../context/AppContext'
import { useCallback } from 'react'
import axios from 'axios'
import { InventoryProduct } from '../types'

import './Cart.css'

type LineItem = {
  product: Omit<InventoryProduct, 'category_id'>
  quantity: number
  unit_price: string
  total_price: string
}

type Cart = {
  id: string
  customer_email: string | null
  total_price: string
  line_items: LineItem[]
}

export function Cart() {
  const queryClient = useQueryClient()

  const { cartId, toast } = useAppContext()

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/carts/${cartId}`)
      return (await response.json()) as Cart
    },
    enabled: !!cartId,
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

  const isEmpty = !cart?.line_items?.length

  return (
    <div className="rounded-xl shadow bg-gray-700 border-gray-800 py-6 px-5 text-white">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Cart</span>
      </div>
      {isEmpty ? (
        <div className="grid justify-items-center gap-4 py-12 px-2">
          <TiShoppingCart className="text-6xl" />
          <span className="text-lg font-semibold">Your cart is empty!</span>
        </div>
      ) : (
        <div className="grid gap-3 mt-6 ">
          <button
            className="underline hover:no-underline justify-self-end text-sm"
            onClick={clearCart}
          >
            remove all
          </button>
          <div className="grid gap-3 divide-y divide-gray-500">
            {cart?.line_items?.map((item, index) => (
              <div key={index} className="grid gap-2 pt-3">
                <span className="flex justify-between text-md font-semibold">
                  <span>{item.product.name}</span>
                  <span className="font-poppins">${item.unit_price}</span>
                </span>
                <div className="flex gap-3 items-center">
                  <span className="font-poppins text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </span>
                </div>
              </div>
            ))}
            <div className="grid pt-3 gap-4">
              <span className="font-poppins flex items-center justify-between">
                Subtotal{' '}
                <span className="text-2xl font-semibold">
                  ${cart.total_price}
                </span>
              </span>

              <button className="checkout-button focus:ring-4 focus:outline-none focus:ring-blue-300">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
