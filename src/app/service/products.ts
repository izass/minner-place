import { ProductsParams } from "../components/domain/api/products";
import { api } from "./api";

export const getProducts = ({ params }: ProductsParams) =>
  api.get('/products', { params })
