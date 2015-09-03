var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dest'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

