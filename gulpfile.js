'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var reload = browserSync.reload;

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var buffer = require('vinyl-buffer');

// sass

gulp.task('sass', function() {
    gulp.src('./app/src/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./app'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./app/src/**/*.scss', ['sass']);
});


// typescript

gulp.task('ts:watch', function() {
    gulp.watch('./app/src/**/*.ts', ['ts']);
});


gulp.task("ts", function () {
    return browserify({
        basedir: 'app',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('app'));
});

// local server

gulp.task('serve', [
    'sass',
    'sass:watch',
    'ts',
    'ts:watch'
], function() {
    browserSync({
        open: false,
        server: {
            baseDir: 'app'
        },
        files: ['app/**/*']
    });
});
