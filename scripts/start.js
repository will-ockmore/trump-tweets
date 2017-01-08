/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'development';

var catchErr = require('./logger').catchErr;
var runBackend = require('./startBackend.js');
var runDevServer = require('./startDevServer.js');

runBackend()
  .catch(catchErr);

runDevServer()
  .catch(catchErr);
