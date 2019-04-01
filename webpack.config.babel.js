const mainConfig = {
  target: 'electron-main',
  mode: 'development',
  entry: {
    main: ['./main.js']
  },
  devtool: 'source-map',
  node: {
    __dirname: false // https://github.com/webpack/webpack/issues/2010#issuecomment-181256611
  },
  module: {
    rules: [
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}

export default [mainConfig]
