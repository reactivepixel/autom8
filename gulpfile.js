const gulp = require('gulp');
const fs = require('fs');
const argv = require('yargs').argv


gulp.task('version', () => {
  // configs
  const newVersion = 'v1.1.0';
  const targetFilePath = './package.json';

  // Increment pkg json
  const pkg = require(targetFilePath);
  pkg.version = newVersion

  fs.writeFile(targetFilePath, JSON.stringify(pkg), (err) => {
    if (err) throw err;
    console.log(targetFilePath + ' has been updated to ' + newVersion);
  });

  console.log(argv);

  // add tag to commit
})
