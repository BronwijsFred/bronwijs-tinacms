import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BronwijsPage from './BronwijsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BronwijsPage />
  </StrictMode>,
)
