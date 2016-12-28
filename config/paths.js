/* eslint-disable no-var, vars-on-top, prefer-template, object-shorthand */
var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function getLocalhostAddr(port) {
  return 'http://localhost:' + port;
}

var webpackDevServerPort = 3000;
var serverPort = process.env.PORT || 3001;

module.exports = {
  appIndexJs: resolveApp('src/index.js'),
  appIndexHtmlTemplate: resolveApp('src/index.html'),
  publicIndexHtml: resolveApp('public/index.html'),
  sourceDir: resolveApp('src'),
  nodeModules: resolveApp('node_modules'),
  buildDir: resolveApp('public'),

  // ports and addresses
  devServerPort: webpackDevServerPort,
  devServerAddr: getLocalhostAddr(webpackDevServerPort),
  nodeServerPort: serverPort,
  nodeServerAddr: getLocalhostAddr(serverPort),
};
