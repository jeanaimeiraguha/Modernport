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
        sans:    ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Geist', 'ui-sans-serif', 'sans-serif'],
        mono:    ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#030712',
          1: '#050a18',
          2: '#060b1a',
          3: '#0a1226',
          4: '#0e1833',
          5: '#132043',
        },
        fg: {
          DEFAULT: '#e8eeff',
          muted:   '#9aa8c7',
          subtle:  '#7d8bab',
        },
        brand: {
          DEFAULT: '#3b82f6',
          light:   '#60a5fa',
          sky:     '#38bdf8',
          cyan:    '#22d3ee',
          deep:    '#1d4ed8',
          indigo:  '#6366f1',
        },
        line: '#94aaff1a',
      },
      maxWidth: { content: '1200px' },
      borderRadius: { card: '1rem', panel: '1.5rem', xl2: '2rem' },
      keyframes: {
        aurora: {
          '0%':   { transform: 'translate3d(-3%,-2%,0) scale(1)',   opacity: '0.85' },
          '50%':  { transform: 'translate3d(3%,2%,0) scale(1.08)',  opacity: '1' },
          '100%': { transform: 'translate3d(-2%,3%,0) scale(1.03)', opacity: '0.9' },
        },
        'rotate-angle': { to: { '--angle': '360deg' } },
      },
      animation: {
        aurora: 'aurora 22s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
