/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env'
  ],
}
