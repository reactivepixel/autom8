const gulp = require('gulp');
const fs = require('fs');
const argv = require('yargs').argv
const git = require('gulp-git');

gulp.task('version', () => {
  // configs
  const targetFilePath = './package.json';

  // Increment pkg json
  const pkg = require(targetFilePath);
  pkg.version = versionBump(pkg.version);

  fs.writeFile(targetFilePath, JSON.stringify(pkg), (err) => {
    if (err) throw err;
    console.log(targetFilePath + ' has been updated to ' + pkg.version);
  });

 //  git.tag(pkg.version, 'Automated Bumping', (err) => {
 //   if (err) throw err;
 // });

})


const versionBump = (initialVersion, type) => {
  const formattedVersion = initialVersion.substr(1, initialVersion.length)
  const parsedVersion = formattedVersion.split('.'); // [v1,2,0]

  for(position in parsedVersion) {
    const versionNumber = parsedVersion[position];
    parsedVersion[position] = parseInt(versionNumber);
  }


  if(argv.type === 'major') {
    const parsedInt = parseInt(parsedVersion[0])
    parsedVersion[0] = parsedInt + 1;
    parsedVersion[1] = 0;
    parsedVersion[2] = 0;
  } else if(argv.type === 'minor') {
    const parsedInt = parseInt(parsedVersion[1])
    parsedVersion[1] = parsedInt + 1;
    parsedVersion[2] = 0;
  } else if(argv.type === 'patch') {
    const parsedInt = parseInt(parsedVersion[2])
    parsedVersion[2] = parsedInt + 1;
  }

  return 'v' + parsedVersion.join('.');
}
