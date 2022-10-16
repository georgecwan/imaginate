/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/*.ts",
      "./public/*.{html, ts, js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['"Cardo"', 'cursive'],
        'sans': ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
