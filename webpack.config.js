const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, 'src/');
const BUILD_DIR = path.resolve(__dirname, 'public/');

module.exports = {
  entry: path.resolve(SOURCE_DIR, 'index.js'),

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },

  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: SOURCE_DIR,
      },
    ],

    loaders: [
      // Babel compilation
      {
        test: /\.(js|jsx)$/,
        include: SOURCE_DIR,
        loader: 'babel',
      },
    ],
  },

  devServer: {
    contentBase: BUILD_DIR,
  },
};
