'use strict';

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	nested = require('postcss-nested'),
	vars = require('postcss-simple-vars'),
	imprt = require('postcss-import'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint'),
	include = require('gulp-html-tag-include');

var path = {
	styles: 'source/styles/',
	css: 'www/css/',
	scripts: 'source/scripts/',
	js: 'www/js/',
	templates: 'source/templates/',
	html: 'www/'
};

gulp.task('default', function () {
	gulp.start('templates', 'styles', 'scripts');
});

gulp.task('live', function () {
	gulp.start('templates', 'styles', 'scripts', 'watch');
});

gulp.task('watch', function () {
	gulp.watch(path.styles + '**/*.css', ['styles']);
	gulp.watch(path.scripts + '**/*.js', ['scripts']);
	gulp.watch(path.templates + '**/*.html', ['templates']);	
});

gulp.task('templates', function () {
	return gulp.src(path.templates + '*.html')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(include())
	.pipe(gulp.dest(path.html))
});

gulp.task('styles', function () {
	var processors = [
		imprt(),
		vars(),
		nested(),
		autoprefixer()
	];
	
	return gulp.src(path.styles + 'layout.css')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(postcss(processors))
	.pipe(rename('style.css'))
	.pipe(cssnano({
		autoprefixer: {
			browsers: ['last 2 versions'],
			add: true
		},
		discardComments: {
			removeAll: true
		}
	}))
	.pipe(gulp.dest(path.css))
});

gulp.task('scripts', function () {
	return gulp.src(path.scripts + '**/*.js')
	.pipe(plumber({ errorHandler: onError }))
	/* .pipe(eslint({
		'rules': {
			'quotes': ['error', 'single'],
			'semi': ['error', 'always']
		}
	}))
	.pipe(eslint.format()) */
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path.js))
});

var onError = function (error) {
	gutil.log([
		(error.name + ' in ' + error.plugin).bold.red,
		'',
		error.message,
		''
	].join('\n'));
	this.emit('end')
};