function stringToArray(str) {
	var array = str.split(",").map(function(val) {
		return val.trim();
	});
	return array;
}

function sortBy(array, property, dir) {
	var arrayOfProperty = array.filter(function(item) {
		return item[property].toLowerCase();
	})
	arrayOfProperty.sort(function(a,b) {
		return a.localCompare(b);
	})
}

function getCookie(name) {
	var value = ";" + document.cookie.replace(/ /g,'');
	var parts = value.split(';' + name + '=');
	if(parts.length == 2) return parts.pop().split(";").shift();

}

export {stringToArray, sortBy, getCookie};