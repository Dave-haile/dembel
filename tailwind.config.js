import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.ts",
    "./resources/**/*.tsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        handwriting: ["Shadows Into Light", "cursive"],
      },
      colors: {
        primary: "#E04622",
        secondary: "#EEAB26",
        tertiary: "#EAEFF3",
        quaternary: "#080808",
        gold: {
          50: "#fdf6e3",
          100: "#fde68a",
          200: "#fcd34d",
          300: "#fbbf24",
          400: "#f59e0b",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
      },
      scrollMargin: {
        24: "6rem",
      },
    },
  },

  plugins: [forms],
};
