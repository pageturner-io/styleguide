var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sassLint = require('gulp-sass-lint');

var paths = {
  sass: {
    files: [
      'src/sass/**/*.scss',
      '!src/sass/exports/*.scss',
      '!src/sass/modules/_example.scss'],
    dest: 'docs/app/css'
  }
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  gulp.src(paths.sass.files)
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['./node_modules/']
    }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(livereload());
});

gulp.task('sass:lint', function () {
  gulp.src(paths.sass.files)
    .pipe(plumber())
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('sass:build', function () {
  gulp.src(paths.sass.files)
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./node_modules/']
    }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.sass.files, ['sass']);
});

gulp.task('express', function () {
  var express = require('express');
  var app = express();
  app.use(express.static('./docs'));
  app.listen(3000);
  console.log('Server started in localhost:3000');
});

gulp.task('default', ['watch', 'sass:lint', 'sass', 'express']);
gulp.task('build', ['sass:lint', 'sass:build']);
gulp.task('lint', ['sass:lint']);
