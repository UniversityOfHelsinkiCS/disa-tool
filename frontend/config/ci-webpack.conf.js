const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devPort = 8080
const apiPort = 8000

module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill", './src/index.js'],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  resolve: {
    fallback: { 
      path: require.resolve("path-browserify") 
    },
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
    ],
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
        use: [
            'style-loader',
            'css-loader', 
        ],
    },
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
          fullySpecified: false
      }
  }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      CONFIG: {
        BASE_PATH: JSON.stringify('')
      },
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({ 
      process: 'process/browser.js', 
    }),
  ],
  devServer: {
    port: devPort,
    proxy: {
      '/api': `http://disa_backend:${apiPort}`
    },
    historyApiFallback: true,
  },
  devtool: 'source-map'
}
