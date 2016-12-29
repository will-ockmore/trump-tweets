/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'development';

var chalk = require('chalk');

var runBackend = require('./startBackend.js');
var runDevServer = require('./startDevServer.js');

runBackend()
  .then(runDevServer)
  .catch(err => console.log(chalk.red(err.stack)));
