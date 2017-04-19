const util = require('util');

const truncate = require('../truncate');
const discord = require('../discord');

const ACTIONS = {
	open: {
		verb: 'Opened', color: 0x4caf50,
		show_desc: true, show_details: false
	},
	reopen: {
		verb: 'Re-opened', color: 0x4caf50,
		show_desc: false, show_details: false
	},
	close: {
		verb: 'Closed', color: 0xf44336,
		show_desc: false, show_details: false
	},
	update: {
		verb: 'Updated', color: 0xffc107,
		show_desc: false, show_details: true
	}
};

class Event {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};
			var attributes = body.object_attributes;
			var action = ACTIONS[attributes.action];

			embed.title = util.format('%s issue `#%d`', action.verb, attributes.id);
			embed.url = attributes.url;
			embed.color = action.color;

			embed.author = discord.create_author_obj(body.user.name, body.user.avatar_url);

			embed.fields = [ {
				name: attributes.title,
				value: truncate(attributes.description, action.show_details ? 240 : 80),
				inline: false
			} ];

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Event;
