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
