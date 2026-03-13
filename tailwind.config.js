/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enhanced cool bluish color palette
        'cool-blue': {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#cfe6ff',
          300: '#b0d6ff',
          400: '#80bfff',
          500: '#2563eb', // Primary blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
        'cool-cyan': {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#0891b2', // Primary cyan
          600: '#0e7490',
          700: '#115e59',
          800: '#134e4a',
          900: '#0f3d3e',
        },
        'cool-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488', // Primary teal
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#0f3d3e',
        },
        'cool-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 2s ease-in-out infinite',
        'drift': 'drift 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 6s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'breathing': 'breathing 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #2563eb, 0 0 10px #2563eb, 0 0 15px #2563eb' },
          '100%': { boxShadow: '0 0 10px #2563eb, 0 0 20px #2563eb, 0 0 30px #2563eb' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-5px, -5px)' },
          '66%': { transform: 'translate(5px, 5px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.33)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.3)',
        'glow-cyan': '0 0 20px rgba(8, 145, 178, 0.3)',
        'glow-teal': '0 0 20px rgba(13, 148, 136, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-back': 'cubic-bezier(0.34, -1.56, 0.64, 1)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
