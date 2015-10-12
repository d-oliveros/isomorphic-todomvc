require('./loadenv');

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      './src/client/bootstrap.js'
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
        test: /src\/server\/models\/index\.js$/,
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': serialize({
        ISOMORPHINE_HOST: process.env.ISOMORPHINE_HOST || 'http://localhost',
        ISOMORPHINE_PORT: process.env.ISOMORPHINE_PORT || '3000'
      })
    })
  ]
};

function serialize(data) {
  for (var key in data) {
    switch (typeof data[key]) {
      case 'string':
        data[key] = '\'' + data[key] + '\'';
        break;

      case 'object':
        data[key] = JSON.stringify(data[key]);
        break;

      default:
        data[key] = '';
        break;
    }
  }
  return data;
}
