'use strict';

let gulp     = require('gulp');
let concat   = require('gulp-concat');
let nodemon  = require('gulp-nodemon');

gulp.task('client', function () {
  gulp.src(['client/**/module.js', 'client/**/*.js'])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('public/scripts'));
});

gulp.task('watch', ['client'], function () {
  gulp.watch('client/**/*.js', ['client']);
});

gulp.task('dev', ['watch'], function () {
  nodemon({
    script: 'server.js',
    ext: '.js',
    ignore: ['client/', 'public/'],
  });
});

gulp.task('build', ['client']);
gulp.task('default', ['build']);
