/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,tsx}',
    './components/**/*.{html,js}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env'
  ]
}
