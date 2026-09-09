/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        innia: {
          bg: "#0b1020",
          panel: "rgba(255,255,255,0.06)",
          accent: "#6ea8fe",
          accent2: "#a78bfa",
        },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
