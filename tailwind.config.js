/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        StarWarsBlack: '#101015',
        StarWarsBrown: '#0071e3',
        StarWarsArmy: '#393438',
        StarWarsGreenSwamp: '#E7ECEE',
        StarWarsTan: '#1d1d1f',
        StarWarsBlueMute: '#668EBB',
        StarWarsBlueSky: '#238AD3',
        StarWarsBlueSaber: '#1CC3EE',
        StarWarsGray: '#BCC8DC',
        StarWarsOffWhite: '#DDDCE4',
        StarWarsYellow: '#FFE81F',
        StarWarsBlackLogo: '#000000',
        StarWarsYodaRobeLight: '#d5cfb6',
        StarWarsYodaRobeDark: '#9d9974',
        StarWarsYodaMoss: '#3c3c20',
        StarWarsYodaSwamp: '#616640',
        StarWarsYodaGreen: '#75934e',
        Onyx: '#353935'
      }
    }
  },
  plugins: [require('daisyui')]
}
