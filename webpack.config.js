/* eslint-disable no-var */
/* eslint-disable vars-on-top */

require('./loadenv');

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      './src/client.js'
    ]
  },
  output: {
    path: path.resolve('../build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8001/build'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /src\/api\/index\.js$/,
        loaders: ['isomorphine']
      }
    ],
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8001,
    publicPath: 'build',
    hot: true,
    contentBase: './build'
  },
  node: {
    fs: 'empty',
    __filename: true
  },
  devtool: 'cheap-module-source-map',
  debug: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
