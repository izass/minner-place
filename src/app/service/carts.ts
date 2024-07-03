import {
  Cart,
  CreateCartParams,
  UpdateCartParams,
} from '../components/domain/api/carts'
import { api } from './api'

export const getCarts = async (cartId: string | null) => {
  const response = await api.get(`/carts/${cartId}`)
  return response.data as Cart
}

export const putCarts = async ({ cartId, params }: UpdateCartParams) => {
  const response = await api.get(`/carts/${cartId}`, { params })
  return response.data as Cart
}

export const postCarts = async ({ params }: CreateCartParams) => {
  const response = await api.get(`/carts/`, { params })
  return response.data as Cart
}
