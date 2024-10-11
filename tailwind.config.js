/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{js,vue,ts}', './pages/**/*.vue', './app.vue', './error.vue'],
  theme: {
    colors: {
      primary: '#1282a2',
      dark_primary: '#12728d',
      light_primary: '#97ccdb',

      secondary: '#be8242',

      false: '#d85b3f',
      true: '#739b2d',

      light: '#efefef',
      dark: '#2d2d2d',
      grey_1: '#7a7a7a',
      grey_2: '#b8b8b8',
      grey_3: '#e0e0e0'
    },
    fontFamily: {
      primary_regular: ['Kodchasan-Regular', 'Arial'],
      primary_medium: ['Kodchasan-Medium', 'Arial'],
      primary_bold: ['Kodchasan-Bold', 'Arial']
    },
    extend: {
      spacing: {
        128: '32rem',
        135: '40rem'
      }
    }
  },
  plugins: []
}
