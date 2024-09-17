import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BookProvider, TaskProvider, OrderProvider,AuthProvider } from './context/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <TaskProvider>
          <BookProvider>

          </BookProvider>
        </TaskProvider>
      </OrderProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
