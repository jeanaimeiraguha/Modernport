import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    // Always set to dark mode
    root.classList.remove('light');
    root.classList.add('dark');

    // Persist to localStorage
    localStorage.setItem('theme', 'dark');
  }, []);

  // Remove toggle functionality
  const toggleTheme = () => {
    // Do nothing - always dark
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);