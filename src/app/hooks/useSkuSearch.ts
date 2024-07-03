import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../service/products'

type UseSkuSearchPorps = {
  closeModal: () => void
  setCartItems: (state: any) => void
}

export const useSkuSearch = ({
  closeModal,
  setCartItems,
}: UseSkuSearchPorps) => {
  const [search, setSearch] = useState<string>('')
  const [submit, setSubmit] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const fetchProductsBySku = async () => {
    const params = {
      sku: search,
    }
    const response = await getProducts({ params })
    setSubmit(false)
    return response.data
  }

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductsBySku,
    enabled: submit,
    retry: false,
    initialData: undefined,
    select: useCallback(
      (data) => {
        if (!data || data.length === 0) {
          return data
        }
        const productToAdd = data[0]
        setCartItems((state) => {
          const { line_items, total_price } = state
          if (line_items.some((item) => item.product.id === productToAdd.id)) {
            return state
          }

          const newItem = {
            quantity: 1,
            unit_price: productToAdd.price,
            total_price: productToAdd.price,
            product: {
              ...productToAdd,
            },
            loading: true,
          }

          const newLineItems = [...line_items, newItem]

          const totalPrize =
            parseFloat(total_price) + parseFloat(productToAdd.price)

          return {
            ...state,
            line_items: newLineItems,
            total_prize: totalPrize,
          }
        })
        return data
      },
      [setCartItems],
    ),
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!search) {
      return
    }
    setSubmit(true)
  }

  useEffect(() => {
    if (product?.length) {
      closeModal()
      queryClient.removeQueries({ queryKey: ['product'] })
    }
  }, [product, closeModal, queryClient])

  const notFound = product?.length === 0

  return {
    search,
    isLoading,
    error,
    product,
    handleChange,
    handleSubmit,
    notFound,
  }
}
