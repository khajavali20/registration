/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light", 
      "dark",
      {
        khaja: {
          primary: "22d3ee",
          secondary: "#3b82f6",
          accent: "#1fb2a6",
          neutral: "#292524",
          "base-100": "#4fd1c5",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272", 
        }
      }
    ],

  }
}

