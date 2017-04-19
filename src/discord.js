// Change the timestamp every 12 hours
const UPDATE_INTERVAL = 1000 * 60 * 60 * 12;
const UPDATE_PARAMETER_NAME = '?CACHEFIX';

// The Discord client for some reason caches images forever, so if a user updates their avatar,
// it will never be updated in the client. This sets a unique timestamp to each URL that shouldn't
// break things, and force the Discord client to update. This assumes the avatar server is linient.
exports.create_author_obj = function(name, icon_url) {
	var timestamp = Math.floor(new Date().getTime() / UPDATE_INTERVAL);

	return {
		name: name,
		icon_url: icon_url + (UPDATE_PARAMETER_NAME + timestamp)
	};
};
