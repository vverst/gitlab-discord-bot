const util = require('util');

const git = require('../git');
const styles = require('../styles');

class Formatter {
	format(body) {
		return new Promise(function(resolve) {
			var embed = {};

			embed.title = body.commits.length > 1 ?
				'Pushed ' + body.commits.length + ' commits' : 'Pushed a commit';

			embed.description = util.format('to branch **%s** of **%s**', git.getBranchName(body.ref), body.project.name);
			embed.url = git.getCommitDiffURL(body.project.web_url, body.before, body.after);

			embed.color = styles.colors.push;
			embed.author = {
				name: body.user_name,
				icon_url: body.user_avatar
			};

			embed.fields = [];

			for (var commit of body.commits) {
				var shorthand = commit.id.substring(0, 8);

				embed.fields.push({
					name: util.format('`%s` %s', shorthand, commit.message),
					value: '- ' + commit.author.name,
					inline: false
				});
			}

			resolve({ embeds: [ embed ] });
		});
	}
}

module.exports = Formatter;
