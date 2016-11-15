var Util = (function() {
	var 
		stringToArray,
		sortBy;
	stringToArray = function(str) {
		var array = str.split(",").map(function(val) {
			return val.trim();
		});
		return array;
	};

	sortBy = function(array, property, dir) {
		var arrayOfProperty = array.filter(function(item) {
			return item[property].toLowerCase();
		})
		arrayOfProperty.sort(function(a,b) {
			return a.localCompare(b);
		})
	};

	return {
		stringToArray: stringToArray,
		sortBy: sortBy

	}
})();

module.exports = Util;