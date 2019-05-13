const gulp = require('gulp');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('style', () => {
	return gulp
		.src('./src/css/**/*.css')
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions']
			})
		)
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('./dest/css'));
});
