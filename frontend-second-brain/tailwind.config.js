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
        darkbg: "#090A0A",  //best color its matched now...
        navbg: "#1A1A1A",
        cardbg: "#1E1E1E",
        accent: "#A855F7",
        accentHover: "#C084FC",
        secondary: "#B3B3B3",
      },

      backgroundImage: {
         //darkbg: "linear-gradient(90deg, #050605 70.7%, #7036E4 13.1%, #ECDDE4 6.5%, #191A27 5.6%, #F9925C 1.8%, #F1211B 1.4%, #321747 0.5%, #A892C4 0.3%)",
        'custom-gradient': 'linear-gradient(115deg, #c266ff, #9966ff, #6699ff)',
        'custom-gradient2': 'linear-gradient(115deg,#d080ff,#aa80ff,#80b3ff )',
      },
    },
  },
  
  plugins: [],
}

