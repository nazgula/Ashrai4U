const { group } = require('console')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.ts',
    './src/**/*.tsx'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#6A4AE3',
      'black': '#050419',
      'yellow': '#F8D648',
      'cyan': '#21E8E6',
      'sky':'#33AAEE',
      'blue': '#4D79F9',
      'gray': '#7B7C85'
    },
    fontFamily: {
      sans: ['SF Pro Display', 'sans-serif'],
      serif: ['Poppins', 'serif']
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
            marginRight: 'auto',
          },
          '.form-fildset': {
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
          },
          '.form-button-group': {
            textAlign: 'center',
            marginTop: '80px',
         }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}

