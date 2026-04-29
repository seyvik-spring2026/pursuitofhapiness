/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        accent: {
          teal: '#00D4E0',
          yellow: '#E8D44D',
        },
      },
    },
  },
  plugins: [],
}
