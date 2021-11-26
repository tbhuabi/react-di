const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ip = require('ip');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname, 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    host: '127.0.0.1',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9027,
    hot: true,
    open: true,
    disableHostCheck: true
  },
  module: {
    rules: [
      //   {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: [{
      //     loader: 'eslint-loader'
      //   }]
      // },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
