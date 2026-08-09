/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#E50914',
          dark: '#B9090B',
          light: '#FF1E27',
          bg: '#4A0407'
        },
        obsidian: {
          DEFAULT: '#0A0A0A',
          surface: '#121212',
          card: '#161616',
          border: '#242424'
        },
        behance: {
          blue: '#1769FF'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Bebas Neue', 'Oswald', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        widest: '0.2em',
        mega: '0.3em'
      }
    },
  },
  plugins: [],
}
