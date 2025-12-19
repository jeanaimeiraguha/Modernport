import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
      title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === 'light' ? (
        <FaMoon className="text-xl" />
      ) : (
        <FaSun className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;