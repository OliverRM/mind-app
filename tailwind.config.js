const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: colors.black,
      },
    },
    fontFamily: {
      sans: ['"Source Sans 3 VF"', "sans-serif"],
    },
  },
  plugins: [],
};
