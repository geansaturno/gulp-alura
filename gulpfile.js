var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var clean       = require('gulp-clean');
var usemin      = require('gulp-usemin');
var uglify      = require('gulp-uglify');
var cssmin      = require('gulp-cssmin');
var concat      = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');

gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('copy', ['clean'], function(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-img', function(){
    gulp.src('src/img/**/*')
        .pipe(imagemin())
            .pipe(gulp.dest('src/img-min'));
});

gulp.task('usemin', function(){
    gulp.src('dist/**/*.html')
        .pipe(usemin({
            js: [uglify],
            css: [cssmin]
        }))
            .pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy'], function(){
    gulp.start('build-img', 'usemin');
});
