globalPackages=(
		# gulp
		# nodemon
	)
localPackages=(
		# browserify 
		# reactify 
		# watchify
		# vinyl-source-stream 
		# gulp 
		# react 
		# react-dom 
		# express 
		# guid
		# mongoose
		# body-parser
		# underscore
		# jquery
		# es6-promise
		# merge-stream
		# # react-ga //not needed 
		# bootstrap-daterangepicker 
		# bootstrap
		# babelify
		# babel-preset-es2015
		# babel-preset-react
		# babel-core
		# gulp-sourcemaps
		gulp-babel
	)

# bowerPackages=(
# 		# bootstrap-css
# 	)
for globalPackage in "${globalPackages[@]}"
do
	sudo npm install -g $globalPackage
done
for localPackage in "${localPackages[@]}"
do
	npm install --save-dev $localPackage
done

# for bowerPackage in "${bowerPackages[@]}"
# do
# 	bower install --save $bowerPackage
# done