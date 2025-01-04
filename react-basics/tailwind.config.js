/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      'lightest':'#fcea8c',
      'light' : '#f2d16c',
      'general-light':'#d1b834',
      'dark' : '#6d8517',
      'darkest': '#3f5b0b',
      'white': '#f5f5f5',
    },
    boxShadow: {
      'custom-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    },
    extend: {},
  },
  plugins: [],
}

