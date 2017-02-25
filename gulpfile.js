'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');


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


/* Obserwacja zmian w plikach */
gulp.task('watch',['sass','browserSync'], function(){
   gulp.watch('app/scss/**/*.scss',['sass']);  
   gulp.watch('app/*.html', browserSync.reload); 
});


gulp.task('build', ['dist', 'sass']);

