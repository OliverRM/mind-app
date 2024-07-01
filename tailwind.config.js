const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: colors.black,
      },
      colors: {
        vermilion: {
          300: "#FCCFAA",
          500: "#EC7F62",
          700: "#D54839",
        },
        bdazzled: {
          300: "#ADB3DA",
          500: "#6487DC",
          700: "#274E90",
        },
      },
    },
    fontFamily: {
      sans: ['"Source Sans 3 VF"', "sans-serif"],
    },
  },
  plugins: [],
};
