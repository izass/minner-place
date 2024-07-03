import React from 'react'
import './SkuSearchMessage.css'

type SkuSearchMessageProps = {
  hasError: boolean
  notFound: boolean
}

export const SkuSearchMessage = ({
  hasError,
  notFound,
}: SkuSearchMessageProps) => {
  const showSearchMessage = !hasError && !notFound
  return (
    <div className="sku-search-message-container">
      {showSearchMessage && (
        <p className="message">
          Use the input above to search for products by their SKU.
        </p>
      )}
      {hasError && (
        <p className="text-red-400">
          Something went wrong on our end! Please try again.
        </p>
      )}
      {notFound && (
        <p className="text-red-400">
          Product not found! Please check the SKU and try again.
        </p>
      )}
    </div>
  )
}
