var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist/assets/js/'),
    filename: 'bundle.js',
    publicPath: '/assets/js/'
  },
  plugins: [
    new ExtractTextPlugin('../css/ola.min.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.json$/, loader: 'json' },
    {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
    }]
  }
};
