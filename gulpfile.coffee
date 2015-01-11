# +--------------------------------------------------------------------+
# | gulp.js config to compile frontend assets
# +--------------------------------------------------------------------+
gulp = require 'gulp'
sass = require 'gulp-sass'
autoprefixer = require 'gulp-autoprefixer'
browserSync = require 'browser-sync'
reload = browserSync.reload
minify = require 'gulp-minify-css'
uglify = require 'gulp-uglify'
gulpif = require 'gulp-if'
argv = require('yargs').argv


# browser-sync task, only cares about compiled CSS
gulp.task 'browser-sync', ->
	browserSync
		files: ['assets/css/*.css', 'index.html']
		proxy:
			port: 4000


# CSS task - finds and compiles all SCSS files
gulp.task 'css', ->
	return gulp.src './scss/app.scss'
		.pipe sass { errLogToConsole: yes }
		.pipe autoprefixer
			browsers: ['last 2 versions']
			cascade: no
		.pipe gulpif argv.production, minify()
		.pipe gulp.dest 'assets/css/'
		.pipe reload { stream: yes }


# rerun tasks whenever a file changes.
gulp.task 'watch', ->
	gulp.watch './scss/**/*.scss', ['css']


# default task (called when we run `gulp` from cli)
gulp.task 'default', ['watch', 'css', 'browser-sync']
gulp.task 'build', ['css']
