// const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  entry: './client/src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, './client'),
      "@server": path.resolve(__dirname, './server')
    },
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/public/index.html",
      filename: 'index.html',
    }),
  ]
};


module.exports = config;