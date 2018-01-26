const util = require('util');

const git = require('../git');
const discord = require('../discord');
const validUrl = require('valid-url');

class Formatter {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};

			embed.title = body.commits.length > 1 ?
				'Pushed ' + body.commits.length + ' commits' : 'Pushed a commit';

			embed.description = util.format('to branch **%s** of **%s**', git.getBranchName(body.ref), body.project.name);
			embed.url = git.getCommitDiffURL(body.project.web_url, body.before, body.after);

			embed.color = 0x00bcd4;

			let avatar_url = body.user_avatar;
			//Check to see if this is a GitLab avatar
			if(!validUrl.isWebUri(avatar_url)) {
				avatar_url = `https://gitlab.com${avatar_url}`;
			}

			embed.author = discord.create_author_obj(body.user_name, avatar_url);

			embed.fields = [];

			for (var commit of body.commits) {
				var shorthand = commit.id.substring(0, 8);
				var message = commit.message.split('\n');
				var description = util.format('- **%s**', commit.author.name);

				if (message.length > 1) {
					description = message.slice(1, message.length).join('\n') + '\n' + description;
				}

				embed.fields.push({
					name: util.format('`%s` %s', shorthand, message[0]),
					value: description,
					inline: false
				});
			}

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Formatter;
