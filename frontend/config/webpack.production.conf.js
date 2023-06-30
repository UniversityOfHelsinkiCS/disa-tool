const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack')


module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js',
  },
  node: {
    global: true
  },
  output: {
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[name]-[id]-[hash].bundle.js',
    path: path.join(__dirname, '../../backend/dist'),
    publicPath: '/'
  },
  resolve: {
    fallback: { 
      path: require.resolve("path-browserify") 
    }
  },
  optimization: {
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [
        new CssMinimizerPlugin(),new TerserPlugin()
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[id]-[hash].css'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      CONFIG: {
        BASE_PATH: JSON.stringify('')
      },
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })

  ],
  devtool: 'source-map'
}
