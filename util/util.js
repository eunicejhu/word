var Util = (function() {
	var 
		stringToArray,
		sortBy,
		getUserFromCookie;

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

	getCookie = function(name) {
		var value = ";" + document.cookie.replace(/ /g,'');
		var parts = value.split(';' + name + '=');
		if(parts.length == 2) return parts.pop().split(";").shift();

	};


	return {
		stringToArray: stringToArray,
		sortBy: sortBy,
		getCookie: getCookie
	}
})();

module.exports = Util;