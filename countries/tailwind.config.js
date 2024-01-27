/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 5px 15px rgba(143, 160, 193, 0.14)',
      },
      screens: {
        exsm: "350px",
        eexsm: "290px",
        tab: "768px",
        lap: "1125px",
        tlap: "1467px"
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        'dBlue': "hsl(209, 23%, 22%)",
        'vdBlue': "hsl(207, 26%, 17%)",
        'vdBlueTxt': "hsl(200, 15%, 8%)",
        'dGray': "hsl(0, 0%, 52%)",
        'vlGray': "hsl(0, 0%, 98%)",
        'white': "hsl(0, 0%, 100%)",
      }
    },
  },
  plugins: [],
}

