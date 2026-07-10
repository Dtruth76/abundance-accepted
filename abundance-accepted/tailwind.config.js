/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B1712',
          50: '#F6F4F1',
          100: '#E9E4DC',
          400: '#6B6055',
          600: '#3A332C',
          800: '#241F19',
          900: '#1B1712',
        },
        parchment: {
          DEFAULT: '#FAF6EE',
          100: '#FFFDF9',
          200: '#F1EADA',
        },
        gold: {
          DEFAULT: '#C99A2E',
          light: '#F2C94C',
          dark: '#8A5E1B',
        },
        moss: {
          DEFAULT: '#2F4B3C',
          light: '#496B57',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        eyebrow: ['"Archivo"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F2C94C 0%, #C99A2E 45%, #8A5E1B 100%)',
      },
    },
  },
  plugins: [],
}
