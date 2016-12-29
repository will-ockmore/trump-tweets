var chalk = require('chalk');


module.exports = function(prefix) {
  var LOG_PREFIX = chalk.blue.bold(`[${prefix}]`) + ':';
  return function logger(message) {
    if (message) {
      return console.log(LOG_PREFIX, message);
    } else {
      return console.log();
    }
  }
}
