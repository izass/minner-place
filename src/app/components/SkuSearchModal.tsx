import React from 'react'
import './SkuSearchModal.css'
import { SkuSearchForm } from './SkuSearchForm'

type SkuSearchModalProps = {
  open: boolean
  closeModal: () => void
  setCartItems: (state: any) => void
}

export const SkuSearchModal = ({
  open,
  closeModal,
  setCartItems,
}: SkuSearchModalProps) => {
  const preventBugling = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  if (!open) {
    return
  }

  return (
    <div className="sku-search-modal" onClick={closeModal}>
      <div className="container" onClick={preventBugling}>
        <div className="header">
          <h1 className="sku-search-title">Product Search</h1>
          <button className="sku-search-modal-close" onClick={closeModal}>
            &times;
          </button>
        </div>
        <SkuSearchForm closeModal={closeModal} setCartItems={setCartItems} />
      </div>
    </div>
  )
}
