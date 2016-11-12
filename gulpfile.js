var gulp = require("gulp");
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

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
		.pipe(source('main.js'))
		.pipe(gulp.dest('app/dist'));
});

gulp.task("copy", ["bundle"], function() {
	return gulp.src(["app/index.html", "app/lib/bootstrap-css/css/bootstrap.min.css", "app/style.css"])
		.pipe(gulp.dest("app/dist"));
});

gulp.task("default", ["copy"], function() {
	console.log("Gulp completed...");
})