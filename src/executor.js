const winston = require('winston');
const unirest = require('unirest');

class HookExecutor {
	constructor(app) {
		this.webhooks = app.config.webhooks;
		this.queues = { };

		this.message_id = 0;
	}

	getWebhook(name) {
		return this.webhooks[name];
	}

	execute(payload, url) {
		var queue = this.queues[url];
		if (!queue) { this.queues[url] = queue = new Queue(url); }

		queue.submit({
			max_attempts: 3,
			attempts: 0,
			data: payload,
			id: this.message_id++
		});
	}
}

class Queue {
	constructor(url) {
		this.queue = [];
		this.url = url;

		this.is_busy = false;

		this.remote_capacity = 3;
		this.remote_reset = 0;
	}

	submit(item) {
		this.queue.push(item);

		this.next();
	}

	next() {
		if (this.is_busy || this.queue.length <= 0) return;
		this.is_busy = true;

		var task = this.queue.shift();
		var start = new Date().getTime();

		winston.debug('Sending Discord message #' + task.id);

		new Promise((resolve, reject) => {
			task.attempts++;

			unirest.post(this.url)
				.headers({ 'Content-Type': 'application/json' })
				.send(task.data)
				.end((response) => {
					if (!response.ok) {
						winston.error('Received server response', response.statusCode, 'while executing webhook');
						winston.error('Server response was', response.body);

						return reject({
							error: 'Failed to POST webhook',
							details: 'The webhook returned a non-200 OK response'
						});
					}

					var remote_reset = response.headers['x-ratelimit-reset'] * 1000;
					var remote_capacity = response.headers['x-ratelimit-remaining'];

					var pause = (remote_reset + 250) - new Date().getTime();

					if (remote_capacity <= 0 && pause > 20) {
						winston.warn('Webhook executor is busy! Can send again in ' + pause + 'ms...');

						setTimeout(() => {
							resolve();
						}, pause);
					} else {
						resolve();
					}
				});
		}).catch((err) => {
			winston.error('Failed to deliver Discord message after ' + (new Date().getTime() - start) + 'ms', err);

			return err;
		}).then((err) => {
			if (!err) winston.debug('Successfully delivered Discord message #' + task.id + ' after ' + (new Date().getTime() - start) + 'ms');

			this.is_busy = false;
			this.next();
		});
	}
}

module.exports = HookExecutor;
