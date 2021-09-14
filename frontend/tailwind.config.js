const defaults = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["src/**/*.jsx", "src/**/*.tsx", "src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', ...defaults.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {
      scrollSnapType: ['responsive'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-scroll-snap')
  ],
}
