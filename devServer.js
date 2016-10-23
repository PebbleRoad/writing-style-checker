var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');

var app = express();
var compiler = webpack(config);

// var dashboard = new Dashboard();
// compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  // quiet: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  // log: () => {}
}));
app.use(express.static('./'));
// app.use(express.static(__dirname));
// app.use(express.static(__dirname + 'dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3002, null, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3002');
});
