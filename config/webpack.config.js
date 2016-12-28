/* eslint-disable no-var, vars-on-top */
var HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = require('./paths.js');


module.exports = {
  entry: paths.appIndexJs,

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
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appIndexHtmlTemplate,
    }),
  ],

  devServer: {
    contentBase: paths.buildDir,
  },
};
