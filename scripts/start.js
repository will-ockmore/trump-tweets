/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'development';

var chalk = require('chalk');

var runBackend = require('./startBackend.js');
var runDevServer = require('./startDevServer.js');

function catchErr(err) {
  return console.log(chalk.red(err.stack));
}

runBackend()
  .catch(catchErr);

runDevServer()
  .catch(catchErr);
