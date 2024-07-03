export type ProductsParams = {
  params: {
    sku?: string
    top_sold?: boolean
    limit?: number
  }
}

export type ProductCart = {
  product_id: string
  quantity: number
}
