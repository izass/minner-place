'use client'

import { TiShoppingCart } from 'react-icons/ti'

import './Cart.css'
import { useCart } from '../hooks/useCart'
import { Button } from './Button'
import { SkuSearchModal } from './SkuSearchModal'

export function Cart() {
  const {
    cart,
    clearCart,
    isEmpty,
    openModal,
    handleOpenModal,
    closeModal,
    setCartItems,
  } = useCart()

  return (
    <div className="rounded-xl shadow bg-gray-700 border-gray-800 py-6 px-5 text-white">
      <SkuSearchModal
        open={openModal}
        closeModal={closeModal}
        setCartItems={setCartItems}
      />
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Cart</span>
        <Button label="&#43;" onClick={handleOpenModal} />
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
                  ${cart?.total_price}
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
