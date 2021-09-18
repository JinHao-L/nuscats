const defaults = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["src/**/*.jsx", "src/**/*.tsx", "src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', ...defaults.fontFamily.sans]
      },
      colors: {
        primary: {
          '50': '#fcfbf9',
          '100': '#fbf0e3',
          '200': '#f7d2c5',
          '300': '#eca797',
          '400': '#fb724c',
          '500': '#d55548',
          '600': '#bc3b30',
          '700': '#942c25',
          '800': '#6a1f1a',
          '900': '#42130f',
        },
        secondary: {
          '50': '#f8f9fb',
          '100': '#ebeefc',
          '200': '#d7d2f9',
          '300': '#b7adf1',
          '400': '#a284e7',
          '500': '#9c2cf3',
          '600': '#7444d2',
          '700': '#5833b2',
          '800': '#3d2483',
          '900': '#231751',
        },
        tertiary: {
          '50': '#fbfaf5',
          '100': '#f9efc8',
          '200': '#f3d994',
          '300': '#fb9e4c',
          '400': '#cc8738',
          '500': '#b2671e',
          '600': '#954d13',
          '700': '#723a11',
          '800': '#4f280e',
          '900': '#34190a',
        },
      },
      backgroundImage: {
        'cover-cat': "url('https://placekitten.com/400/908')",
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
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-scroll-snap'),
  ],
}
