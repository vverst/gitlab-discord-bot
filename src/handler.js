class EventHandler {
	constructor() {
		this.formatters = {
			'push': new (require('./events/push'))(),
			'issue': new (require('./events/issue'))(),
			'note': new (require('./events/note'))()
		};
	}

	isEventSupported(body) {
		return this.formatters[body.object_kind] != null;
	}

	createMessage(body) {
		return new Promise((resolve, reject) => {
			var type = body.object_kind;
			var formatter = this.formatters[type];

			if (formatter == null) {
				return reject({
					error: 'Unable to create message body',
					details: 'No event formatter exists for event ' + type
				});
			}

			formatter.format(body).then(function (r) {
				resolve(r);
			}).catch(function (e) {
				reject(e);
			});
		});
	}
}

module.exports = EventHandler;
