/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px', sm: '640px', md: '768px',
      lg: '1024px', xl: '1280px', '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans:    ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono:    ['Inter', 'monospace'],
      },
      colors: {
        dark: {
          900: '#080810', 800: '#0c0c16',
          700: '#0e0e1c', 600: '#111120', 500: '#1a1a2e',
        },
        accent: { DEFAULT: '#6366f1', hover: '#818cf8', glow: 'rgba(99,102,241,0.25)' },
      },
      keyframes: {
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        'orb-drift': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':      { transform: 'translate(30px,-20px) scale(1.05)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'float':          'float 7s ease-in-out infinite',
        'orb-drift':      'orb-drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
