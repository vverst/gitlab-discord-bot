module.exports = function(str, max) {
	if (str.length > max) {
		return str.substring(0, max) + '...';
	}

	return str;
};
