/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],  // Default sans-serif font
        serif: ['Merriweather', 'serif'],  // Add Merriweather for serif fonts
      },
    },
  },
  plugins: [
    require('@tailwindcss/nesting')
  ],
}

