/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "bg-dark-black": "#252A3E",
      },
      minWidth: {
        vsm: "375px",
      },
    },
  },
  plugins: [],
};
