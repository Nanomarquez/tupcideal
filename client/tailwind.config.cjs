/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon': '0 0px 10px #fff, 0 0 40px #fff, 0 0 80px #fff',
      },
    },
  },
  plugins: [],
}
