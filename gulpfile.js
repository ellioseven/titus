'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var sasslint = require('gulp-sass-lint');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassGlob())
    .pipe(sasslint({
       configFile: '.sasslint.json'
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
