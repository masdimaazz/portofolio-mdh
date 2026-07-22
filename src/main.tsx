import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { PageSpinner } from './components/Spinner'

// Panel admin di-lazy load → tidak menambah bundle situs publik.
const AdminApp = lazy(() => import('./admin/AdminApp'))
const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {isAdmin ? (
        <Suspense fallback={<PageSpinner />}>
          <AdminApp />
        </Suspense>
      ) : (
        <App />
      )}
    </ErrorBoundary>
  </StrictMode>,
)
