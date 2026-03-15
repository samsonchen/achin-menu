/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        salmon: '#D89575',
        green: '#3D8A5A',
        gold: '#D4A64A',
        dark: '#1A1918',
      },
    },
  },
  plugins: [],
}
