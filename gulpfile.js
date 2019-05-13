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

gulp.task('copy-images', () => {
	return gulp
		.src('./src/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('./dest/images'));
});

gulp.task('copy-js', () => {
	return gulp
		.src([
			'./src/js/resources.js',
			'./src/js/engine.js',
			'./src/js/app.js',
			'./src/js/music.js'
		])
		.pipe(
			babel({
				presets: ['@babel/env']
			})
		)
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dest/js'));
});

gulp.task('copy-HTML', () => {
	return gulp.src('./src/index.html').pipe(gulp.dest('./dest'));
});

gulp.task('watch', () => {
	gulp.watch('./src/js/**', gulp.series('copy-js'));
	gulp.watch('./src/css/**/*.css', gulp.series('style'));
	gulp.watch('./src/index.html', gulp.series('copy-HTML'));
});

gulp.task('all', () => {
	gulp.parallel('style', 'copy-images', 'copy-js', 'copy-HTML', 'watch');
});
