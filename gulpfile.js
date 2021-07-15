// Include gulp
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('css', function(){
	return gulp.src('./public/scss/style.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./public/'));
});

gulp.task('default', function(){
    gulp.watch('./public/scss/*.scss', gulp.series('css'));
  return
});