var gulp = require('gulp'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	webserver = require('gulp-webserver'),
	plumber = require('gulp-plumber'),
	cache = require('gulp-cache'),
	del = require('del');

// Script task
gulp.task('script', function(){
	return gulp.src('app/js/**')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(notify({message: 'Script task complete!'}));
});

// Compass task
gulp.task('compass', function(){
	return gulp.src('app/sass/**')
		.pipe(plumber())
		.pipe(compass({
			css: 'app/css/',
			sass: 'app/sass/',
			image: 'app/image/',
			sourcemap: true,
			style: 'expanded',
			comments: false,
			require: ['susy']
		}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(notify({message: 'Compass task complete!'}));
});

// Styles task
gulp.task('styles', function(){
	return gulp.src('app/css/**')
		.pipe(plumber())
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css'))
		.pipe(notify({message: 'Styles task complete!'}));
});

gulp.task('html', function(){
	return gulp.src('app/*.html')
		.pipe(plumber())
		.pipe(gulp.dest('build/'))
		.pipe(notify({message: 'Html task complete!'}));
});

// Image task
gulp.task('images', function(){
	return gulp.src('app/image/**')
		.pipe(plumber())
		.pipe(cache(imagemin({progressive: true})))
		.pipe(gulp.dest('build/image'))
		.pipe(notify({message: 'Images task complete!'}));
});

// Webserver task
gulp.task('webserver', function(){
	gulp.src('app/')
		.pipe(webserver({
			port: 12345,
			livereload: true,
			directoryListing: false,
			fallback: 'index.html'
		}))
});

// Clean task
gulp.task('clean', function(){
	return del(['build/js', 'build/*.html', 'build/css', 'build/image']);
})

// Watch task
gulp.task('watch', function(){
	gulp.watch('app/js/**', ['script']);
	gulp.watch('app/sass/**', ['compass']);
	gulp.watch('app/css/**', ['styles']);
	gulp.watch('app/*.html', ['html']);
	gulp.watch('app/image/**', ['images']);
});

// Default task
gulp.task('default', ['clean'], function(){
	gulp.start('script', 'compass', 'styles', 'html', 'images', 'watch', 'webserver');
});



