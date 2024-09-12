/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        brightOrange: '#faa51d',
        lightGreen: '#c6eb7a',
        mainTeal: '#30b79e',
        darkerTeal: '#1ef56D',
        textBlue: '#162f50',
      },
    },
  },
  plugins: [],
}
