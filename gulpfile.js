var gulp = require("gulp");
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var merge = require('merge-stream');

console.log(__dirname);
gulp.task("bundle", function() {
	var bundler = browserify({
			entries: "./app/main.jsx",
			debug: true,
			transform: [reactify],
			debug: true,
			cache: {},
			packageCache: {},
			fullPaths: true
		});
	var watcher = watchify(bundler);

	return watcher
		.on('update', function() {
			var updateStart = Date.now();
			console.log('Updating!');
			watcher.bundle()
			.pipe(source('main.js'))
			.pipe(gulp.dest('app/dist'));
			console.log('Updated!', (Date.now() - updateStart) + 'ms');
		})
		.bundle()
		.on('error', function(err){
	      // print the error (can replace with gulp-util)
	      console.log(err.message);
	      // end this stream
	    })
		.pipe(source('main.js'))
		.pipe(gulp.dest('app/dist'));
});

gulp.task("bootstrap", function() {
	var fonts = gulp.src("app/lib/bootstrap-css/fonts/**")
		.pipe(gulp.dest("app/dist/fonts"));
	var bootstrap_css = gulp.src("app/lib/bootstrap-css/css/bootstrap.min.css")
		.pipe(gulp.dest("app/dist/bootstrap"));
	var bootstrap_js = gulp.src("app/lib/bootstrap-css/js/bootstrap.js")
		.pipe(gulp.dest("app/dist/"))
	return merge(fonts, bootstrap_css, bootstrap_js);
});

gulp.task("copy", ["bundle", "bootstrap"], function() {
	return gulp.src(
		[
			"app/index.html", 
			"app/lib/jquery/dist/jquery.js",
			"app/style.css"
		])
		.pipe(gulp.dest("app/dist"));
});

gulp.task("default", ["copy"], function() {
	console.log("Gulp completed...");
})