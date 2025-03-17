/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navy: "#0a192f",
        "light-navy": "#112240",
        "lightest-navy": "#233554",
        slate: "#8892b0",
        "light-slate": "#a8b2d1",
        "lightest-slate": "#ccd6f6",
        green: "#64ffda",
      },
      fontFamily: {
        sans: ["Calibre", "sans-serif"],
        mono: ["SF Mono", "Fire Code", "monospace"],
      },
    },
  },
  plugins: [],
}

