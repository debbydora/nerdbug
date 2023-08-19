/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./src/assets/images/cloud1.jpg')",
        sunset: "url('./src/assets/images/sunset.jpg')",
      },
      backgroundColor: {
        bgGrd: " hsla(64, 41%, 92%, 1)",
      },
      colors: {
        bluelighter: "#100EID",
        bluedark: "#100EID",
        progressbar: "#FFEC65",
      },
      boxShadow: {
        customShadow: "0 0 10px rgba(19, 114, 171, 0.5)",
      },
    },
  },
  plugins: [],
};
