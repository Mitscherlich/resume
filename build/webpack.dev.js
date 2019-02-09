const { resolve } = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.common')

const r = path => resolve(__dirname, path)

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: r('../dist') }
})
