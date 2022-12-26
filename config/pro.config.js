const { merge } = require('webpack-merge');
const common = require('./common.config');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
});