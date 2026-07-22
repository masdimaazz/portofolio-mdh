import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'

// Panel admin di-lazy load → tidak menambah bundle situs publik.
const AdminApp = lazy(() => import('./admin/AdminApp'))
const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {isAdmin ? (
        <Suspense fallback={null}>
          <AdminApp />
        </Suspense>
      ) : (
        <App />
      )}
    </ErrorBoundary>
  </StrictMode>,
)
