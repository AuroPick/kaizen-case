import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Navigation } from './src/navigation/Navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false
    }
  }
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Navigation />
  </QueryClientProvider>
)

export default App
