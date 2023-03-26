import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './assets/Components/Context'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AppContextProvider>

  </React.StrictMode>,
)
