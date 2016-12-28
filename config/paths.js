/* eslint-disable no-var, vars-on-top */
var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appIndexJs: resolveApp('src/index.js'),
  appIndexHtmlTemplate: resolveApp('src/index.html'),
  sourceDir: resolveApp('src'),
  nodeModules: resolveApp('node_modules'),
  buildDir: resolveApp('public'),
};
