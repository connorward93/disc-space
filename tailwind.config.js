module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx'],
  theme: {
    colors: {
      black: '#000',
      gray: {
        100: '#FAFAFA',
        200: '#F4F4F4',
        300: '#EAEAEA',
        400: '#999999',
        500: '#888888',
        600: '#666666',
        700: '#444444',
        800: '#333333',
        900: '#111111',
      },
    },
    extend: {
      gridTemplateColumns: {
        disc: '32px repeat(3, minmax(0, 1fr)) 32px',
        main: '12em 1fr',
      },
    },
  },
};
