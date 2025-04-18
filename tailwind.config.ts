import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Extra small screens
        sm: "640px", // Small screens (default)
        md: "768px", // Medium screens (default)
        lg: "1024px", // Large screens (default)
        xl: "1280px", // Extra large screens (default)
        "2xl": "1536px", // 2X extra large screens (default)
        "3xl": "1920px", // Custom 3X extra large
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        'dark-blue': '#1F2E3C',
        "sidebar-blue": "#030449",
        yellow: '#F8C700',
        'medium-blue': '#3B5C6D',
        'dark-background': '#1a1a1a',
        'dark-text': '#e4e4e4',
        'milky-bg-dark-heading': '#610D13',
        'heading': '#1F2E3C',
        'dark-heading': '#c5c6c7',
        'milky': '#FFF3B8',
        'pink': '#C5967C',
        'primary-button': "#111F53",
        'secondary-button': "#bdb619",

      },
      backgroundColor: {
        "dark-mode": "#000000", 
        "light-mode": "#ffffff", 
        "icon": "#BEC2C6",
        "image": "#C1C7CD",
        'milky': '#FFF3B8',
        "sidebar-blue": "#030449",
        'primary-button': "#111F53",
        'secondary-button': "#bdb619",
        yellow: '#F8C700',
        'primary-button-hover': "#1C2C7A",
        'button-dark-hover': "#0E1A45",
        'button-darker-hover': "#1A2D70",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
