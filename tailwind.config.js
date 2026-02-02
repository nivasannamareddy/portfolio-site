/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0b172a',
        ocean: 'rgb(var(--secondary-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        mint: '#6fe5c1',
        glass: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        glow: '0 10px 50px rgba(111, 229, 193, 0.18)',
      },
      backgroundImage: {
        'grid-overlay':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
