// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      colors: {
        indigo: { 100: "#0077dd", 200: "#003c7a" },
        white: "#fff",
        gray: {
          100: "#fbfbfb",
          200: "#fafafb",
          300: "#f8f8f8",
          400: "#f4f4f4",
          500: "#f3f2f2",
          600: "#f2f2f4",
          700: "#eaeaea",
          800: "#e7e7e7",
          900: "#e4e4e4",
          1000: "#d2d2d2",
          1100: "#c5c5c5",
          1200: "#b7b7b7",
          1300: "#b4b4b4",
          1400: "#999",
          1500: "#79877d",
          1600: "#7d7d7d",
          1700: "#707070",
          1800: "#383838",
          1900: "#172337",
          2000: "#111",
          2100: "#0f1111",
          2200: "#090909",
          bg: "#DEDEDE33",
        },
        black: "#000",
        orange: { 100: "#fcba08", 200: "#ffaa00", 300: "#f9a51b" },
        green: {
          100: "#32d502",
          200: "#338e3c",
          300: "#039e2c",
          txt: "#409344",
          star: "#3594AC",
          price: "#518a54",
        },
        tan: "#ffd382",
        beige: "#fff6e6",
        brown: "#c45500",
        teal: "#52b9e8",
        red: { 100: "#ff0505", 200: "#ff300f", txt: "#FF3232" },
        myellow: "#FFD382",
        yellow: {
          btn: "#F0BB27",
        },
        blue: {
          brd: "#1492E6",
          "btn-bg": "#0077DD",
        },
      },
      borderRadius: {
        "2xxs": "5px",
        xxs: "10px",
        small: "15px",
        base: "23px",
        large: "25px",
        xxl: "55px",
      },
    },
    fontSize: {
      xs: "0.75rem",
      "2sm": "0.8rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    // If you are changing the breakpoints here, please also update them in global css media queries.
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "769px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  corePlugins: { preflight: false },
};
