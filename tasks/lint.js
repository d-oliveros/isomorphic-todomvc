/* eslint-disable no-var */
var gulp = require('gulp');
var eslint = require('gulp-eslint');

var lintFiles = [
  'src/**/*.jsx',
  'src/**/*.js',
  'config/**/*.js',
  'tasks/**/*.js',
  'init.js',
  'gulpfile.js'
];

module.exports = function lint() {
  var clearSeq = '\u001B[2J\u001B[0;0f';
  process.stdout.write(clearSeq);

  return gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.formatEach(null, console.log.bind(console)))
    .pipe(eslint.failOnError());
};
