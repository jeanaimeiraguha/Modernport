/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#141420',
          600: '#1a1a2e',
          500: '#22223a',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
    },
  },
  plugins: [],
}
