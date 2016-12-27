var path = require("path");

var SOURCE_DIR = path.resolve(__dirname, 'src/');
var BUILD_DIR = path.resolve(__dirname, 'public/');

module.exports = {
  entry: path.resolve(SOURCE_DIR, 'index.js'),

  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },

  module: {
    loaders: [
      // Babel compilation
      {
        test: /\.(js|jsx)$/,
        include: SOURCE_DIR,
        loader: 'babel'
      },

    ]
  },

  devServer: {
    contentBase: BUILD_DIR
  }
};
