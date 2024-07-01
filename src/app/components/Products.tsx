'use client'

import { Product } from '@/app/components/Product'

import type { InventoryProduct } from '../types'
import { useQuery } from '@tanstack/react-query'

export function Products({ categoryId }: { categoryId: number }) {
  const { data: products } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/products')
      const data = (await response.json()) as InventoryProduct[]

      return data?.filter((dat) => dat.category_id === categoryId)
    },
  })

  return (
    <div className="grid gap-4 auto-rows-fr min-[320px]:grid-cols-3 p-6">
      {products?.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  )
}
