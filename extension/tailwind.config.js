/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./*.{html, ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['"Pacifico"', 'cursive'],
      }
    },
  },
  plugins: [],
}
