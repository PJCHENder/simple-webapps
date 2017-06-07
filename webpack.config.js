const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('stylesheets/application.css')


function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: path.join(__dirname, 'assets/javascripts/application'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'javascripts/application.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias: {
      '@': resolve('assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000 /* 小於 10kB 的圖片轉成 base64 */,
              name: 'images/[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000000 /* 小於 10kB 的圖片轉成 base64 */,
              name: 'fonts/[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
      Tether: 'tether'
    })
  ]
}

module.exports = config