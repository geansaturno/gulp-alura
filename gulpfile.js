var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var clean           = require('gulp-clean');
var usemin          = require('gulp-usemin');
var uglify          = require('gulp-uglify');
var cssmin          = require('gulp-cssmin');
var concat          = require('gulp-concat');
var htmlReplace     = require('gulp-html-replace');
var browserSync     = require('browser-sync');
var jsHint          = require('gulp-jshint');
var jshintStylish   = require('jshint-stylish');
var csslint         = require('gulp-csslint');
var csslintStylish      = require('csslint-stylish')

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

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/js/*.js', function(event){
        gulp.src(event.path)
        .pipe(jsHint())
            .pipe(jsHint.reporter(jshintStylish));
    });

    gulp.watch('src/css/*.css', function(event){
        gulp.src(event.path)
        .pipe(csslint())
            .pipe(csslint.reporter());
    });

    gulp.watch('src/**/*', browserSync.reload);
});
