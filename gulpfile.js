'use strict';

const cached = require('gulp-cached');
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sasslint = require('gulp-sass-lint');
const sassPartialsImported = require('gulp-sass-partials-imported');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

// Compile stylesheets.
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    // Cache files, identical files aren't compiled.
    .pipe(cached('sassfiles'))
    .pipe(sassPartialsImported('./sass'))
    // Lint stylesheets.
    .pipe(sasslint({
       configFile: '.sasslintrc.json'
     }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    // Create source maps.
    .pipe(sourcemaps.init())
    // Compile.
    .pipe(sass().on('error', sass.logError))
    // Write stylesheets.
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
});

// Watch stylesheets.
gulp.task('sass:watch', function () {
  // Init compile to warm cache.
  gulp.start('sass');
  watch('./sass/**/*.scss', function () {
    // Compile stylesheets.
    gulp.start('sass');
  });
});

// Parse fontello codes to sass variables.
gulp.task('fontello', function() {
  var src = './fonts/fontello/css/fontello-codes.css';
  var dest = './sass/lib/variables/_fontello.scss';
  // Read fontello codes from file.
  fs.readFile(src, 'utf-8', function (err, data) {
    var icons = [];
    // First group matches icon name, second matches icon code.
    var expression = /.(icon-.+?(?=:)).+\\(.+?)'.+/g;
    var lines = data.split("\n");
    // Loop matches.
    for (var line of lines) {
      var match = expression.exec(line);
      // Push formatted icon variable string.
      if (match) icons.push("$" + match[1] + ": '\\" + match[2] + "';");
    }
    // Write icons to file.
    fs.open(dest, 'w', '0755', function (err, fd) {
      fs.writeSync(fd, icons.join("\n"));
      fs.writeSync(fd, "\n");
    });
  })
});
