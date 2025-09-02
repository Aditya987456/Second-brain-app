/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
         //darkbg: "#0D0D0D",
         darkbg:"#0e0d0c",
        navbg: "#1A1A1A",
        cardbg: "#1E1E1E",
        accent: "#A855F7",
        accentHover: "#C084FC",
        secondary: "#B3B3B3",
      },

      backgroundImage: {
        'custom-gradient': 'linear-gradient(115deg, #c266ff, #9966ff, #6699ff)',

      },
    },
  },
  plugins: [],
}

