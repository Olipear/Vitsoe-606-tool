// production config
const merge = require('webpack-merge')
const webpack = require('webpack')
const { resolve } = require('path')

const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../public'),
    publicPath: '',
  },
  devtool: 'source-map',
  plugins: [new webpack.EnvironmentPlugin(['API_BASE'])],
})
