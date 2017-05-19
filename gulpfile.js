var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

gulp.task('clean', function(){
    return gulp.src('/dist')
        .pipe(clean());
});

gulp.task('copy', ['clean'], function(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-img', ['copy'], function(){
    gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('src/img-min'));
});
