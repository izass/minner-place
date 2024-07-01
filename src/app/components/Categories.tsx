'use client'

import { useEffect, useState } from 'react'
import { Products } from './Products'
import { InventoryProduct } from '../types'

type Category = {
  id: number
  name: string
  products: InventoryProduct[]
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([])

  async function fetchCategories() {
    const response = await fetch('http://localhost:4000/categories')
    const data = await response.json()

    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          <div className="mx-6 rounded-lg shadow bg-gray-500 border-gray-800 py-2">
            <h1 className="pl-6 text-4xl font-semibold tracking-tight text-[#EECE23]">
              {category.name}
            </h1>
          </div>
          <Products categoryId={category.id} />
        </div>
      ))}
    </div>
  )
}
