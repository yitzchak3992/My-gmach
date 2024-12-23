

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A5276',
        secondary: '#F39C12',
        BackgroundDark:'#D5D8DC',
        light: '#FDFEFE',
        dark: '#212F3C',
        success: '#27AE60',
        warning: '#D35400',
        error: '#C0392B',
      },
    },
  },
  plugins: [],
}
