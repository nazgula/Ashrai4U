const { group } = require('console')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    './src/**/*.ts',
    './src/**/*.tsx'],
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    
    fontFamily: {
      sans: ['Noto Sans Hebrew', 'Assistant', 'SF Pro Display', 'sans-serif'],
      serif: ['Poppins', 'serif']
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#6A4AE3',
        'black': '#050419',
        'yellow': '#F8D648',
        'cyan': '#21E8E6',
        'sky':'#33AAEE',
        'blue': '#4D79F9'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
       
        '.form': {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '418px',
            marginTop: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          '.w-form': {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            marginTop: '30px',
            marginLeft: 'auto',
            marginRight: 'auto'
          },
          '.form-fildset': {
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
          },
          '.form-button-group': {
             textAlign: 'center',
             // position: 'fixed',
             
         }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}

