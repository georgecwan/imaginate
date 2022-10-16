/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/*.{html, ts}",
      "./public/*.{html, ts}",
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
