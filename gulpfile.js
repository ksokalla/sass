'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


gulp.task('hello',function(){
    console.log('hello world');
});

/*LIVE RELOAD*/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

/*Kompilacja plików scss do css*/
gulp.task('sass', function(){
   return gulp.src('app/scss/**/*.scss')
       .pipe(sass())
       .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({
          stream: true
        }))
    
});

/* przerzucenie plików html do folderu dist (na produkcję)*/

gulp.task('dist', function(){
	return gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'));
});

/* przerzucenie plików css do folderu dist (na produkcję)*/

gulp.task('cssnano', function(){
	return gulp.src('app/css/*.css')
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'));
});

/* przerzucenie plików js do folderu dist (na produkcję)*/

gulp.task('uglify', function(){
	return gulp.src('app/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

/* przerzucenie plików img do folderu dist (na produkcję)*/

gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

/* przerzucenie fontów do folderu dist (na produkcję)*/

gulp.task('fonts', function() {
  return gulp.src('app/fonts/*')
  .pipe(gulp.dest('dist/fonts'))
})

/* Obserwacja zmian w plikach */
gulp.task('watch',['sass','browserSync'], function(){
   gulp.watch('app/scss/**/*.scss',['sass']);  
   gulp.watch('app/*.html', browserSync.reload); 
});


gulp.task('build', ['sass', 'dist', 'cssnano', 'uglify', 'images', 'fonts']);

