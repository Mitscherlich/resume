const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { resolve } = require('path')

const r = (path) => resolve(__dirname, path)

module.exports = {
  entry: r('../src/index.ts'),
  output: {
    filename: '[name].[hash].js',
    path: r('../dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': r('../src'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        bscroll: {
          test: /[\\/]node_modules\/better-scroll[\\/]/,
          name: 'chunk-bscroll',
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [r('../dist')],
    }),
    new CopyWebpackPlugin([
      r('../public/CNAME'),
      r('../public/favicon.ico'),
      r('../public/manifest.json'),
      r('../public/assets'),
    ]),
    new HtmlWebpackPlugin({ template: r('../public/index.html') }),
    new MiniCSSExtractPlugin({ filename: '[name].[hash].css', chunkFilename: '[id].[hash].css' }),
    new OptimizeCSSAssetsPlugin(),
  ],
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: ['babel-loader'] },
      { test: require.resolve('mithril'), use: [{ loader: 'expose-loader', options: 'm' }] },
      {
        test: /\.styl$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: { config: { path: r('../.postcssrc') } } },
          'stylus-loader',
        ],
      },
      { test: /\.css$/, use: [MiniCSSExtractPlugin.loader, 'css-loader'] },
      { test: /\.jpg$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/jpeg' } }] },
      { test: /\.png$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/png' } }] },
      { test: /\.svg$/, use: ['file-loader'] },
      { test: /\.(yaml|yml)$/, use: ['raw-loader'] },
    ],
  },
}
