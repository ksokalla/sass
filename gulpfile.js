'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


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


/* Obserwacja zmian w plikach */
gulp.task('watch',['sass','browserSync'], function(){
   gulp.watch('app/scss/**/*.scss',['sass']);  
   gulp.watch('app/*.html', browserSync.reload); 
});

