const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'styled-components',
  'react-redux',
  'redux',
  'axios',
  'react-skycons',
  'reselect'
]

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',

      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:9000',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './src/index.js'
      // the entry point of our app
    ],
    vendor: VENDOR_LIBS
  },

  output: {
    filename: '[name].js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              import: false
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  devServer: {
    contentBase: resolve(__dirname, './dist'),
    host: 'localhost',
    port: 9000,
    publicPath: '/',
    historyApiFallback: true,
    // respond to 404s with index.html
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    },
    stats: 'minimal',
    hot: true
    // enable HMR on the server
  }
}
