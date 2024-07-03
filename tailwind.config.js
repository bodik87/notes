/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-gray": "#F0F1F3",
        "app-gray-200": "#ADB0B3",
        "app-green": "#47B378",
        "app-blue": "#1368C4",
        "app-red": "#FB4D2E",
        "app-rose": "#F94876",
        "app-yellow-100": "#F7F6B5",
        "app-yellow-200": "#F7D974",
        "app-yellow-300": "#F4D152",
      },
      screens: {
        pc: "450px",
      },
    },
  },
  plugins: [],
};
