/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        2: "repeat(2, minmax(260px, 1fr))",
      },
    },
  },
 
  plugins: [],
};
