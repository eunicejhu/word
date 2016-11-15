globalPackages=(
		# gulp
		# bower
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
		 merge-stream
	)

bowerPackages=(
		bootstrap-css
	)
for localPackage in "${localPackages[@]}"
do
	npm install --save-dev $localPackage
done

for bowerPackage in "${bowerPackages[@]}"
do
	bower install --save $bowerPackage
done