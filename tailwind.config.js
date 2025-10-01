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
            },
        },
    },

    plugins: [forms],
};
