/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var chalk = require('chalk');


module.exports = function createLogger(prefix) {
  var LOG_PREFIX = chalk.blue.bold(`[${prefix}]`) + ':';
  return function logger(message) {
    if (message) {
      return console.log(LOG_PREFIX, message);
    }
    return console.log();
  };
};
