/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '480px', sm: '640px', md: '768px',
      lg: '1024px', xl: '1280px', '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans:    ['Kumbh Sans', 'sans-serif'],
        display: ['Kumbh Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#054163',
          dark:    '#022e47',
          light:   '#0b6a9e',
          sky:     '#0991df',
        },
        ink:  { DEFAULT: '#0f0d1d', body: '#585858', muted: '#8a8f98' },
        sub:  '#f3f7fb',
        line: { DEFAULT: '#e3e3e3', soft: '#eaecf0' },
      },
      maxWidth: {
        content: '1350px',
      },
      boxShadow: {
        qt:    '0px 4px 25px 0px rgba(0,0,0,0.06)',
        'qt-lg': '0px 12px 40px 0px rgba(5,65,99,0.12)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(90deg, #0f0d1d -76.72%, #054163 191.51%)',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translate3d(0,40px,0)' },
          to:   { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        sway_Y: {
          from: { transform: 'translateY(0)' },
          to:   { transform: 'translateY(20px)' },
        },
        sway_X: {
          from: { transform: 'translateX(-26px)' },
          to:   { transform: 'translateX(26px)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'sway-y':     'sway_Y 5s linear infinite alternate',
        'sway-x':     'sway_X 9s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
