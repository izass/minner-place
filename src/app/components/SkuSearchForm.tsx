import React from 'react'
import { Button } from './Button'
import './SkuSearchForm.css'
import { useSkuSearch } from '../hooks/useSkuSearch'
import { SkuSearchMessage } from './SkuSearchMessage'

type SkuSearchFormProps = {
  closeModal: () => void
  setCartItems: (state: any) => void
}

export const SkuSearchForm = ({ closeModal, setCartItems }: SkuSearchFormProps) => {
  const { search, isLoading, error, notFound, handleChange, handleSubmit } =
    useSkuSearch({closeModal, setCartItems})

  const buttonDisplay = !isLoading ? 'Search 🔍' : 'Searching...'
  return (
    <div>
      <form className="sku-search-form" onSubmit={handleSubmit}>
        <input
          className="sku-search-input"
          type="text"
          placeholder="SKU"
          value={search}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Button label={buttonDisplay} disabled={isLoading} />
      </form>
      <SkuSearchMessage hasError={!!error} notFound={notFound} />
    </div>
  )
}
