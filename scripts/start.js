/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'development';

var detect = require('detect-port');
var webpack = require('webpack');
var openBrowser = require('react-dev-utils/openBrowser');
var prompt = require('react-dev-utils/prompt');
var chalk = require('chalk');
var WebpackDevServer = require('webpack-dev-server');

var paths = require('../config/paths.js');
var config = require('../config/webpack.config.js');


var compiler = webpack(config);

function runDevServer(port) {
  var devServer = new WebpackDevServer(compiler, {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // use server address - served in iframe mode
    // https://webpack.github.io/docs/webpack-dev-server.html#combining-with-an-existing-server
    contentBase: paths.nodeServerAddr,
  });

  // Launch WebpackDevServer.
  devServer.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log(chalk.cyan('Starting the development server...'));
    console.log();
    openBrowser('http://localhost:' + port + '/webpack-dev-server/');
  });
}


function run(port) {
  runDevServer(port);
}

detect(paths.devServerPort).then(port => {
  if (port === paths.devServerPort) {
    run(port);
    return;
  }
  var question =
      chalk.yellow('Something is already running on port ' + paths.devServerPort + '.') +
      '\n\nRun on a different port?';

  prompt(question, true).then(shouldChangePort => {
    if (shouldChangePort) {
      run(port);
    }
  });
});
