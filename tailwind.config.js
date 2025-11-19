// eslint-disable-next-line no-unused-vars
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
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
        handwriting: ["Shadows Into Light", "cursive"],
      },
      colors: {
        // primary: "#E04622",
        // secondary: "#EEAB26",
        // tertiary: "#EAEFF3",
        // quaternary: "#080808",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          '50': '#f1f4fd',
          '100': '#e0e7f9',
          '200': '#c8d5f5',
          '300': '#a3bbed',
          '400': '#7797e3',
          '500': '#5675db',
          '600': '#4259ce',
          '700': '#3847bd',
          '800': '#303890',
          '900': '#2e377a',
          '950': '#20244b',
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          '50': '#fdfee8',
          '100': '#fbfec3',
          '200': '#fcfe8a',
          '300': '#fefa46',
          '400': '#fbee21',
          '500': '#ebd307',
          '600': '#cba603',
          '700': '#a27806',
          '800': '#855e0e',
          '900': '#714c12',
          '950': '#422806',
          foreground: "hsl(var(--accent-foreground))",
        },
        pink: {
          '50': '#fcf3f6',
          '100': '#fbe8f0',
          '200': '#f8d2e2',
          '300': '#f3aec8',
          '400': '#eb7ba3',
          '500': '#e05481',
          '600': '#d13f67',
          '700': '#b22447',
          '800': '#94203b',
          '900': '#7b2034',
          '950': '#4b0c1a',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
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
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(100px)",
            filter: "blur(33px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotateReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        fadeLoop: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animationDelay: {
        300: "0.3s",
        600: "0.6s",
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-in-out forwards",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        "rotate-slow": "rotateSlow 6s linear infinite",
        "rotate-reverse": "rotateReverse 8s linear infinite",
        fade: "fadeLoop 3s ease-in-out infinite",
        orbit: "orbit 6s linear infinite",
      },
      scrollMargin: {
        24: "6rem",
      },
    },
  },

  plugins: [
    forms,
    function ({ addUtilities }) {
      const newUtilities = {
        ".animation-delay-300": {
          "animation-delay": "0.3s",
        },
        ".animation-delay-600": {
          "animation-delay": "0.6s",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
