const util = require('util');
const truncate = require('../truncate');
const discord = require('../discord');

class Event {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};

			var type = body.object_attributes.noteable_type;
			var where = '`???`';

			if (type == 'Commit') {
				where = util.format('commit `%s`', body.commit.substring(0, 8));
			} else if (type == 'Issue') {
				where = util.format('issue `#%s`', body.issue.iid);
			} else if (type == 'MergeRequest') {
				where = util.format('merge request `!%s`', body.merge_request.iid);
			} else if (type == 'Snippet') {
				where = util.format('snippet `$%s`', body.snippet.id);
			}

			embed.title = 'Commented on ' + where;
			embed.color = 0x3f51b5;
			embed.url = body.object_attributes.url;

			embed.description = truncate(body.object_attributes.note, 240);

			embed.author = discord.create_author_obj(body.user.name, body.user.avatar_url);

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Event;
