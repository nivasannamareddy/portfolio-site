/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0c1118',
        ocean: '#121926',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2-rgb) / <alpha-value>)',
        sky: { 400: '#38bdf8' },
        indigo: { 400: '#818cf8' },
        glass: 'rgba(255,255,255,0.05)',
      },
      boxShadow: {
        glow: '0 12px 28px rgba(124, 199, 255, 0.18)',
      },
      backgroundImage: {
        'grid-overlay':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
