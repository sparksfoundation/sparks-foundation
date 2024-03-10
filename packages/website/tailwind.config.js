/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'sparks-purple-400':'#8971FF',
        'sparks-purple-500':'#7B61FA',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33.333%',
        '5/12': '41.666%',
        '1/2': '50%',
        '7/12': '58.333%',
        '2/3': '66.666%',
        '3/4': '75%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/3': '33.333%',
        '5/12': '41.666%',
        '1/2': '50%',
        '7/12': '58.333%',
        '2/3': '66.666%',
        '3/4': '75%',
      },
      screens: {
        '800': '800px',
        '500': '500px',
      }
    },
  },
  plugins: [],
}