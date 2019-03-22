const mainConfig = {
  target: 'electron-main',
  mode: 'development',
  entry: {
    main: ['./main.js']
  },
  devtool: 'source-map',
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
