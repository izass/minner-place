import { InventoryProduct } from "@/app/types"
import { ProductCart } from "./products"

export type LineItem = {
  product: Omit<InventoryProduct, 'category_id'>
  quantity: number
  unit_price: string
  total_price: string
}

export type Cart = {
  id: string
  customer_email: string | null
  total_price: string
  line_items: LineItem[]
}

export type CreateCartParams = {
  params: {
    line_items_attributes: ProductCart[]
  }
}

export type UpdateCartParams = {
  cartId: string;
  params: {
    line_items_attributes: ProductCart[]
  }
}

