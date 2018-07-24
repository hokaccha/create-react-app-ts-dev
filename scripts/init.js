'use strict';

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function(appPath, appName) {
  const ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
  const ownPath = path.join(appPath, 'node_modules', ownPackageName);
  const appPackage = require(path.join(appPath, 'package.json'));

  appPackage.scripts = { start: 'webpack-dev-server' };
  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2));
  fs.copySync(path.join(ownPath, 'template'), appPath);

  execSync('yarn', { stdio: 'inherit' });

  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(`  $ cd ${appName}`);
  console.log('  $ yarn start');
};
