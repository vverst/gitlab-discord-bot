const util = require('util');

const styles = require('../styles');
const truncate = require('../truncate');

class Event {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};
			var attributes = body.object_attributes;
			var action = attributes.action;

			var verb = '???';
			var short = true;

			if (action == 'open') {
				verb = 'Opened';
				short = false;
			} else if (action == 'close') {
				verb = 'Closed';
			} else if (action == 'update') {
				verb = 'Updated';
			}

			embed.title = util.format('%s issue `#%d`', verb, attributes.id);

			embed.color = styles.colors.issue[action];
			embed.url = attributes.url;

			embed.author = {
				name: body.user.name,
				icon_url: body.user.avatar_url
			};

			var desc = truncate(attributes.description, short ? 120 : 240);

			embed.fields = [
				{
					name: attributes.title,
					value: desc,
					inline: false
				}
			];

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Event;
