const winston = require('winston');
const unirest = require('unirest');

class HookExecutor {
	constructor(app) {
		this.webhooks = app.config.webhooks;
	}

	getWebhook(name) {
		return this.webhooks[name];
	}

	execute(payload, webhook) {
		return new Promise((resolve, reject) => {
			unirest.post(webhook)
				.headers({ 'Content-Type': 'application/json' })
				.send(payload)
				.end(function (response) {
					if (!response.ok) {
						winston.error('Received server response', response.statusCode, 'while executing webhook');
						winston.error('Server response was', response.body);

						return reject({
							error: 'Failed to POST webhook',
							details: 'The webhook returned a non-200 OK response'
						});
					}

					resolve();
				});
		});
	}
}

module.exports = HookExecutor;
