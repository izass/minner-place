'use client'

import { LayoutComponent } from '@/app/components/LayoutComponent'
import Store from '@/app/components/Store'
import { AppProvider } from './context/AppProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <LayoutComponent>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Store />
        </AppProvider>
      </QueryClientProvider>
    </LayoutComponent>
  )
}
