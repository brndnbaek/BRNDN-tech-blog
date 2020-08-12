const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.liquid', './src/**/*.md'],
  theme: {
    extend: {
      fontFamily: {
        kor: ['Bazzi', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
