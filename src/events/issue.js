const util = require('util');

const styles = require('../styles');

class Event {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};

			if (body.object_attributes.action == 'open') {
				embed.title = util.format('Opened issue `#%d`', body.object_attributes.id);
				embed.color = styles.colors.issue.opened;
			} else if (body.object_attributes.action == 'close') {
				embed.title = util.format('Closed issue `#%d`', body.object_attributes.id);
				embed.color = styles.colors.issue.closed;
			}

			embed.url = body.object_attributes.url;

			embed.author = {
				name: body.user.name,
				icon_url: body.user.avatar_url
			};

			embed.fields = [
				{
					name: body.object_attributes.title,
					value: body.object_attributes.description,
					inline: false
				}
			];

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Event;
