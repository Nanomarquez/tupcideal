/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon': '0 0px 10px #93c5fd, 0 0 40px #f472b6, 0 0 80px #93c5fd',
      },
    },
  },
  plugins: [],
}
