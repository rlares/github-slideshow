/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'grupo-sago': {
          primary: '#0066CC',
          secondary: '#003D7A',
          accent: '#FF6B35',
          light: '#F0F4F8',
          dark: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
}
