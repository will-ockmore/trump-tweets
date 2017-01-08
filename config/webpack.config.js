/* eslint-disable no-var, vars-on-top */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var paths = require('./paths.js');

// config for webpack dev server.
// see also: scripts/startDevServer.js

module.exports = {
  entry: [
    paths.appIndexJs,
    'webpack/hot/dev-server',
  ],

  devtool: 'eval',

  output: {
    path: paths.buildDir,
    filename: 'bundle.js',
  },

  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.sourceDir,
      },
    ],

    loaders: [
      // Babel compilation
      {
        test: /\.(js|jsx)$/,
        include: paths.sourceDir,
        loader: 'babel',
      },

      // sass compilation - see also the plugin further below
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },

  plugins: [

    // necessary for hot reloading of css
    new webpack.HotModuleReplacementPlugin(),

    // creates index.html from template specified,
    // including script and style tags.
    new HtmlWebpackPlugin({
      template: paths.appIndexHtmlTemplate,
      inject: 'body',
    }),
  ],

  // options to be passed to node-sass
  sassLoader: {
    // allow resolution of @import from this directory,
    // so long relative imports are not necessary
    includePaths: [paths.appScss],
  },

};
