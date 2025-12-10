/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },  
      colors: {
                'sahira-green': '#566c2f',
                'sahira-beige': '#efe9dd',
              },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(15deg)' },
        }
      }
    },
  },
  plugins: [
    
  ],
};

