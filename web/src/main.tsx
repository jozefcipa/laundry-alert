import { createRoot } from 'react-dom/client'
import './index.css'
import { LaundryAlert } from './components/LaundryAlert.tsx'

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    location.reload()
  }
})

createRoot(document.getElementById('root')!).render(<LaundryAlert />)
