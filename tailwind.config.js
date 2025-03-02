/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
      screens: {
        'xxs':'320px',
        'xs':'360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [],
};
