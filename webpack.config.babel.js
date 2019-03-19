const mainConfig = {
  target: 'electron-main',
  mode: 'production',
  entry: {
    main: ['./main.js']
  },
  devtool: 'source-map'
}

export default [mainConfig]
