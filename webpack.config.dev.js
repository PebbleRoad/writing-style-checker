var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  // resolve: {
  //   alias: {
  //     'react': path.join(__dirname, 'node_modules/react'),
  //     'olasearch': path.join(__dirname, './../npm-olasearch'),
  //     'olasearch-elasticsearch-adapter': path.join(__dirname, './../npm-olasearch-elasticsearch-adapter'),
  //     'olasearch-solr-adapter': path.join(__dirname, './../npm-olasearch-solr-adapter')
  //   },
  //   fallback: path.resolve(__dirname, './node_modules')
  // },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.json$/, loader: 'json' },
    {
      test: /(\.scss|\.css)$/,
      loader: 'style!css!sass'
    }
    ]
  }
};
