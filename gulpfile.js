'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const sasslint = require('gulp-sass-lint');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassGlob())
    .pipe(sasslint({
       configFile: '.sasslintrc.json'
     }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
});

gulp.task('sass:watch', function () {
  watch('./sass/**/*.scss', function () {
    gulp.start('sass');
  });
});
