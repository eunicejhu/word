var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require("watchify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");

gulp.task("frontend", function() {
	var bundler = browserify({
			entries: "./frontend/main.jsx",
			debug: true,
			cache: {},
			packageCache: {},
			fullPaths: true
		})
	.transform(babelify.configure({
  presets: ["es2015", "react"]
}));
	var watcher = watchify(bundler);

	return watcher
		.on('update', function() {
			var updateStart = Date.now();
			console.log('Updating!');
			watcher.bundle()
			.pipe(source('main.js'))
			.pipe(gulp.dest('frontend/dist'));
			console.log('Frontend Updated!', (Date.now() - updateStart) + 'ms');
		})
		.bundle()
		.on('error', function(err){
	      // print the error (can replace with gulp-util)
	      console.log(err.message);
	      // end this stream
	    })
		.pipe(source('main.js'))
		.pipe(gulp.dest('frontend/dist'));
});

gulp.task("lib", function() {
	//---------bootstrap
	var bootstrap = gulp.src("node_modules/bootstrap/dist/**/*")
		.pipe(gulp.dest("frontend/dist/lib/bootstrap"));

	//---------bootstrap-daterangepicker
	var bootstrap_daterangepicker = gulp.src(["node_modules/bootstrap-daterangepicker/daterangepicker.js", "node_modules/bootstrap-daterangepicker/daterangepicker.css"])
		.pipe(gulp.dest("frontend/dist/lib/daterangepicker/"));

	//---------jquery
	var jquery = gulp.src("node_modules/jquery/dist/jquery.js").pipe(gulp.dest("frontend/dist/lib/jquery/"))

	return merge(bootstrap, bootstrap_daterangepicker, jquery);
});

gulp.task("common", function() {
	gulp.src("./util/*.js")
		.pipe(sourcemaps.init())
			.pipe(babel({
	            presets: ['es2015']
	        }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./backend/dist"));
});

gulp.task("copy", ["frontend", "lib", "common"], function() {
	return gulp.src(
		[
			"frontend/index.html", 
			"frontend/style.css"
		])
		.pipe(gulp.dest("frontend/dist"));
});

gulp.task("default", ["copy"], function() {
	console.log("Gulp completed...");
})