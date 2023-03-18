/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/views/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray_0: '#8B8B8B',
        gray_1: '#A2A2A2',
        gray_2: '#B9B9B9',
        gray_3: '#D0D0D0',
        gray_4: '#E8E8E8',
        gray_5: '#F3F3F3',

        red_0: '#F21B6A',
        red_1: '#F44887',
        red_2: '#F776A5',
        red_3: '#FAA3C3',
        red_4: '#FDD1E1',
        red_5: '#FEE7F0',

        green_0: '#53D07C',
        green_1: '#75D996',
        green_2: '#97E3B0',
        green_3: '#BAECCA',
        green_4: '#DCF6E5',
        green_5: '#EDFAF2',

        blue_0: '#5680F9',
        blue_1: '#7799FA',
        blue_2: '#99B3FB',
        blue_3: '#BBCCFD',
        blue_4: '#DDE6FE',
        blue_5: '#EEF2FF',

        primary_text: '#434343',
      },
    },
  },
  plugins: [],
};
