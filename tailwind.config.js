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
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: { DEFAULT: '#08090b', 1: '#0e1013', 2: '#15171c', 3: '#1c1f25' },
        accent: { DEFAULT: '#7c5cff', hi: '#9b82ff', alt: '#4cc2ff' },
        body: { DEFAULT: '#f7f8f8', dim: '#9ba1a9', faint: '#666c75' },
      },
      maxWidth: { content: '1240px' },
      borderRadius: { xs: '10px', card: '14px', panel: '22px' },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translate3d(0,40px,0)' },
          to:   { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
      },
      animation: { 'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both' },
    },
  },
  plugins: [],
}
