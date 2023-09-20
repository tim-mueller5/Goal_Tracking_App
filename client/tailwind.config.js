/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Amaranth, sans-serif',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        'custom': 'repeat(3, 1fr)',
      }
    },
  },
  plugins: [],
}

