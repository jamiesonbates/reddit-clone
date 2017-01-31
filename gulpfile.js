'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:5000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
    reloadDelay: 1000
  })
});

gulp.task('nodemon', (cb) => {
  return nodemon({
    script: './app/bin/www',
    ignore: [
      'test/',
      'public/',
      'gulpfile.js',
      'node_modules/'
    ]
  }).on('start', () => {
    setTimeout(cb, 500);
  });
});
