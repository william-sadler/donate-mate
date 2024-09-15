/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/components/**.tsx'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        light: '#fcefdf',
        brightOrange: '#faa51d',
        lightGreen: '#c6eb7a',
        lime: '#79b304',
        lightTeal: '#30b79e',
        brightTeal: '#7ecdba',
        darkerTeal: '#1e756D',
        blue: '#162f50',
        textBlue: '#122946',
      },
    },
  },
  plugins: [],
}
