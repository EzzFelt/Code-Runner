import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Containers/App/index'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
