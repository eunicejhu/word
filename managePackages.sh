globalPackages=(
		gulp
		bower
		nodemon
	)
localPackages=(
		# browserify 
		# reactify 
		# vinyl-source-stream 
		# gulp 
		# react 
		# react-dom 
		# express 
		# guid
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