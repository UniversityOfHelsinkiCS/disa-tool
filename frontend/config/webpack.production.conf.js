const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/index.js'],
  node: {
    global: true,
  },
  output: {
    filename: '[name]-[fullhash].bundle.js',
    chunkFilename: '[name]-[id]-[fullhash].bundle.js',
    path: path.join(__dirname, '../../backend/dist'),
    publicPath: '/',
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[fullhash].css',
      chunkFilename: '[name]-[id]-[fullhash].css',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.DefinePlugin({
      CONFIG: {
        BASE_PATH: JSON.stringify(''),
      },
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  devtool: 'eval-source-map',
}
