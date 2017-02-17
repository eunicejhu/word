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

gulp.task("lib", function() {
	//---------bootstrap
	var bootstrap = gulp.src("node_modules/bootstrap/dist/**/*")
		.pipe(gulp.dest("app/dist/lib/bootstrap"));

	//---------bootstrap-daterangepicker
	var bootstrap_daterangepicker = gulp.src(["node_modules/bootstrap-daterangepicker/daterangepicker.js", "node_modules/bootstrap-daterangepicker/daterangepicker.css"])
		.pipe(gulp.dest("app/dist/lib/daterangepicker/"));

	//---------jquery
	var jquery = gulp.src("node_modules/jquery/dist/jquery.js").pipe(gulp.dest("app/dist/lib/jquery/"))

	return merge(bootstrap, bootstrap_daterangepicker, jquery);
});

gulp.task("copy", ["bundle", "lib"], function() {
	return gulp.src(
		[
			"app/index.html", 
			"app/style.css"
		])
		.pipe(gulp.dest("app/dist"));
});

gulp.task("default", ["copy"], function() {
	console.log("Gulp completed...");
})