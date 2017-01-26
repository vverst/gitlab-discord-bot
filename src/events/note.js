const util = require('util');

const styles = require('../styles');

class Event {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};

			var type = body.object_attributes.noteable_type;
			var where = '`???`';

			if (type == 'Commit') {
				where = util.format('commit `%s`', body.object_attributes.commit_id.substring(0, 8));
			} else if (type == 'Issue') {
				where = util.format('issue `#%s`', body.object_attributes.id);
			} else if (type == 'MergeRequest') {
				where = util.format('merge request `!%s`', body.object_attributes.id);
			} else if (type == 'Snippet') {
				where = util.format('snippet `$%s`', body.object_attributes.id);
			}

			embed.title = 'Commented on ' + where;
			embed.color = styles.colors.note;
			embed.url = body.object_attributes.url;

			embed.description = body.object_attributes.note;

			embed.author = {
				name: body.user.name,
				icon_url: body.user.avatar_url
			};

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Event;
