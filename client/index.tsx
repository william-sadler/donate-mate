import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    /**
     * DONE: replace domain, clientId, and audience
     */
    <Auth0Provider
      domain="dev-m8ff1hl5oxw1g7y5.au.auth0.com"
      clientId="ckLCjVJeTFwtPgDHWTK3C0hyrPKhZoIl"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://donatemate/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
