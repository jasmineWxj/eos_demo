const { merge } = require('webpack-merge');
const common = require('./common.config');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 3000,
    headers: {
      'X-Fast-Id': 'p3fdg42njghm34gi9ukj',
    },
    historyApiFallback: true
  },
});