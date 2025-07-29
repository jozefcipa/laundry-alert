import { createRoot } from 'react-dom/client'
import './index.css'
import { LaundryAlert } from './components/LaundryAlert.tsx'

createRoot(document.getElementById('root')!).render(<LaundryAlert />)
