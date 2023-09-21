/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/*.js'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Amaranth, sans-serif',
      },
      gridTemplateColumns: {
        'custom': 'repeat(3, 1fr)',
      },
      animation: {
        "flash": 'flash 0.5s ease-in 2',
      },
      keyframes: {
        flash: {
          '0%': { transform: 'scale(0)', visibility: "visible" },
          '100%': { transform: 'scale(1)', visibility: "visible" },
        }
      }
    },
  },
  plugins: [],
}

// infinite