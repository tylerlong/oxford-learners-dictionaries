const mainConfig = {
  target: 'electron-main',
  mode: 'development',
  entry: {
    main: ['./main.js']
  },
  devtool: 'source-map'
}

export default [mainConfig]
