module.exports = {
  purge: ["src/**/*.jsx", "src/**/*.tsx", "src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
