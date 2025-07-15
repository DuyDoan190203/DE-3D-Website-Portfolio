/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#001F3F",        // Deep blue primary
        secondary: "#b8c6db",      // Light gray for secondary text
        tertiary: "#0a2f5c",       // Darker blue for cards
        "black-100": "#001122",    // Very dark blue
        "black-200": "#000811",    // Nearly black blue
        "white-100": "#f8f9fa",    // Clean white
        "data-green": "#228B22",   // Analytics green
        "data-blue": "#4A90E2",    // Data visualization blue
        "accent-cyan": "#00CED1",  // Cyan for highlights
      },
      boxShadow: {
        card: "0px 35px 120px -15px #001133",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "data-gradient": "linear-gradient(135deg, #001F3F 0%, #228B22 100%)",
      },
    },
  },
  plugins: [],
};
