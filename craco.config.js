const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Types': path.resolve(__dirname, 'src/types'),
      '@Helpers': path.resolve(__dirname, 'src/helpers'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Styles': path.resolve(__dirname, 'src/styles'),
      '@Redux': path.resolve(__dirname, 'src/redux'),
      '@Slices': path.resolve(__dirname, 'src/redux/slices'),
      '@Selectors': path.resolve(__dirname, 'src/redux/selectors'),
      '@Svg': path.resolve(__dirname, 'src/svg'),
    },
  },
  jest: {
    configure: {
      globals: {
        CONFIG: true,
      },
    },
  },
}
