// development config
const merge = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./common')
const Dotenv = require('dotenv-webpack')
const ip = require('ip')

module.exports = (env) => {
  const host = env && env.USING_DOCKER ? 'localhost' : ip.address()
  const devHost = env && env.USING_DOCKER ? '0.0.0.0' : ip.address()

  return merge(commonConfig, {
    mode: 'development',
    entry: [
      'react-hot-loader/patch', // activate HMR for React
      'webpack-dev-server/client?http://' + host + ':3000', // bundle the client for webpack-dev-server and connect to the provided endpoint
      'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
      './index.tsx', // the entry point of our app
    ],
    devServer: {
      hot: true, // enable HMR on the server
      host: devHost,
      port: 3000,
      historyApiFallback: true,
    },
    output: {
      publicPath: 'http://' + host + ':3000/',
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new Dotenv(),
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    ],
  })
}
