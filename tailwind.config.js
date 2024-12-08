/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html", // Inclua o HTML principal
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Inclua todos os arquivos Vue e JS na pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

