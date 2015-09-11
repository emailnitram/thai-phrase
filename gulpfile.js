var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var useref = require('gulp-useref');

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dest'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch', ['sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  //gulp.watch('./**/*.html');
  gulp.watch('app/**/*.js', shell.task(['npm run buildjs']));
});

