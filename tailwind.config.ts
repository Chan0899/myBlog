/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#000000',
          50: '#f0f0f0',
          100: '#d4d4d4',
          200: '#a0a0a0',
          300: '#707070',
          400: '#505050',
          500: '#383838',
          600: '#282828',
          700: '#1a1a1a',
          800: '#0d0d0d',
          900: '#050505',
          950: '#000000',
        },
      },
    },
  },
  plugins: [],
}
