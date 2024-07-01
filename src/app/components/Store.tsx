'use client'

import { Cart } from '@/app/components/Cart'

import { InventoryProduct } from '../types'
import { Categories } from './Categories'

export type CartProduct = InventoryProduct

function Store() {
  return (
    <div className="min-h-[60vh] grid md:gap-8 md:flex md:flex-row pt-6">
      <div className="w-full">
        <Categories />
      </div>

      <div className="md:min-w-[375px] gap-6 row-start-1 overflow-hidden md:flex md:flex-col">
        <Cart />
      </div>
    </div>
  )
}

export default Store
