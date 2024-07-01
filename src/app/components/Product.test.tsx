import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Product } from './Product'
import { InventoryProduct } from '@/app/types'
import { render, waitFor } from '@/utils/testing/utils'
import { http, HttpResponse } from 'msw'
import { server } from '@/utils/testing/msw'
import * as AppContext from '@/app/context/AppContext'
import { toast } from 'react-toastify'

const mockedProduct: InventoryProduct = {
  category_id: 1,
  description: 'Refreshing beverage.',
  currency: 'USD',
  id: 1,
  name: 'Soda',
  price: '5.99',
  inventory: 4,
  reserved: 0,
  sold: 0,
  sku: 'SODA',
}

const updateCartId = vi.fn()

vi.spyOn(AppContext, 'useAppContext').mockReturnValue({
  cartId: '803ea6fc-42a2-4232-b508-4d89a21702d5',
  toast,
  updateCartId,
})

const mockedCart = {
  id: '803ea6fc-42a2-4232-b508-4d89a21702d5',
  customer_email: null,
  total_price: '10.5',
  line_items: [
    {
      product: {
        id: 3,
        name: 'Lemonade',
        description: 'A refreshing citrus drink.',
        sku: 'LEMON',
        price: '3.5',
        currency: 'USD',
        inventory: 7,
        reserved: 5,
        sold: 0,
      },
      quantity: 3,
      unit_price: '3.5',
      total_price: '10.5',
    },
  ],
}

describe('<Product/>', () => {
  beforeEach(() => {
    const handler = http.put(
      `http://localhost:4000/carts/803ea6fc-42a2-4232-b508-4d89a21702d5`,
      async () => {
        return HttpResponse.json(mockedCart)
      },
    )
    server.use(handler)
  })

  test('renders the product name', async () => {
    const screen = render(<Product product={mockedProduct} />)

    expect(await screen.findByText('Soda')).toBeInTheDocument()
  })

  test('updates cartId when a product is added to the cart', async () => {
    const screen = render(<Product product={mockedProduct} />)

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })

    screen.user.click(addToCartButton)

    await waitFor(() => {
      expect(screen.queryByText(/Soda added to the cart!/i)).toBeInTheDocument()
    })
  })
})
