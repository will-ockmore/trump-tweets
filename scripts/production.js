/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'production';

var catchErr = require('./logger').catchErr;
var runBackend = require('./startBackend.js');
var paths = require('../config/paths.js');


runBackend(paths.nodeServerPort)
  .catch(catchErr);
