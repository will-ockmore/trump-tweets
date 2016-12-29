/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var childProcess = require('child_process');

var paths = require('../config/paths.js');
var checkForPortAndRun = require('./checkForPort.js');


function runServer(port) {
  return new Promise((resolve, reject) => {
    var invoked = false; // make sure the process doesn't throw twice

    var backendServer = childProcess.fork(paths.appServerJs, [port]);

    backendServer.on('error', (err) => {
      if (invoked) resolve();
      invoked = true;
      reject(err);
    });

    backendServer.on('exit', (code) => {
      if (invoked) resolve();
      invoked = true;
      if (code !== 0) {
        reject(new Error('exit code ' + code));
      } else {
        resolve(code);
      }
    });
    resolve(backendServer);
  });
}

function run() {
  return checkForPortAndRun(paths.nodeServerPort, runServer);
}

module.exports = run;
