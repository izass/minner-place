'use client'

import { TiImageOutline } from 'react-icons/ti'

import { InventoryProduct } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'

export function Product({ product }: { product: InventoryProduct }) {
  const { cartId, toast, updateCartId } = useAppContext()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: ({
      cartId,
      productId,
    }: {
      cartId: string | null
      productId: number
    }) => {
      const method = cartId ? axios.put : axios.post

      return method(`http://localhost:4000/carts/${cartId ?? ''}`, {
        line_items_attributes: [{ product_id: productId, quantity: 1 }],
      })
    },
    onSuccess: ({ data }) => {
      updateCartId(data?.id)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast(`${product.name} added to the cart!`)
    },
  })

  return (
    <div className="grid rounded-xl rounded-lg shadow bg-gray-700 border-gray-800">
      <div className="bg-gray-600 flex items-center justify-center rounded-t-xl py-20">
        <TiImageOutline className="text-2xl fill-gray-400" />
      </div>

      <div className="px-3 pt-2 pb-3 grid gap-2">
        <div className="">
          <span className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight text-white">
              {product.name}
            </span>

            <span className="text-gray-400 text-sm font-poppins min-h-10">
              {product.description}
            </span>
          </span>
        </div>

        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-bold text-white">
            ${parseFloat(product.price).toFixed(2)}
          </span>

          <button
            className="text-black bg-[#EECE23] hover:bg-[#111827] hover:text-[#EECE23] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            onClick={() => mutate({ productId: product.id, cartId })}
          >
            <span>add to cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}
