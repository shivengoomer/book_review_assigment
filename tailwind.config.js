/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ⚡ important for toggling dark mode via class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563eb',
          dark: '#60a5fa',
        },
        background: {
          light: '#ffffff',
          dark: '#000000',
        },
        text: {
          light: '#0f172a',
          dark: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
};
