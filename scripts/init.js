'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = function(appPath, appName, verbose, originalDirectory) {
  const ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
  const ownPath = path.join(appPath, 'node_modules', ownPackageName);
  const appPackage = require(path.join(appPath, 'package.json'));
  const useYarn = fs.existsSync(path.join(appPath, 'yarn.lock'));

  appPackage.scripts = { start: 'webpack-dev-server' };
  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2));

  fs.copySync(path.join(ownPath, 'template'), appPath);
};
