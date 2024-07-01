import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppProvider } from '@/app/context/AppProvider'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>{children}</AppProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => ({
  user: userEvent.setup(),
  ...render(component, { wrapper: Providers, ...options }),
})

export * from '@testing-library/react'
export { customRender as render }
