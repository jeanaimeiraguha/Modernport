import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import LoadingAnimation from './LoadingAnimation.jsx'
import './index.css'
import './i18n'; // Import i18next configuration
import { ThemeProvider } from './ThemeContext';

const RootApp = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10000) // 10 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? <LoadingAnimation /> : <App />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <RootApp />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)