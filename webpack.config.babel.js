import HtmlWebpackPlugin from 'html-webpack-plugin'

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

const loadingConfig = {
  target: 'web',
  mode: 'development',
  entry: {
    index: './index.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

export default [mainConfig, loadingConfig]
