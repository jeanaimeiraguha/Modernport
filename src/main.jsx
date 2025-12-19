import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import './i18n'; // Import i18next configuration
import { ThemeProvider } from './ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
