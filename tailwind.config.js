/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
      screens: {
      },
    },
    extend: {
      maxWidth: {
        custom: "6rem",
      },
      cursor: {
        default: "pointer",
        text: "text",
      },
      colors: {
        primary: "#3360D3",
        secondary: "#164573",
        "gray-400": "#4B5563",
        "gray-200": "#EDEFF2",
        "gray-100": "#F7F7F7",
        "gray-300": "#DCDEE1",
        "sub-text": "#465866",
        "light-gray": "#EBEFFB",
        "state-fail-100": "#FFE0E0",
        "state-fail-300": "#C33F2A",
        "state-success-100": "#CCFAD1",
        "state-success-300": "#008A44",
        "state-warning-200": "#FFFAD1",
        "state-warning-300": "#5D5F00",
        black: "#030712",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ['"Noto Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
