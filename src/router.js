const winston = require('winston');

const app = require('./app.js');
const handler = new (require('./handler'))(app);
const executor = new (require('./executor'))(app);

const express = require('express');
const router = express.Router();

router.post('/webhook/:name', function (req, res) {
	var start = new Date().getTime();

	var token = req.headers['x-gitlab-token'];

	if (token != app.config.authentication.secret) {
		return res.status(403).json({
			error: 'Not authenticated'
		});
	}

	var name = req.params.name;

	if (!name || name.length <= 0) {
		return res.status(400).json({
			error: 'Bad request',
			details: 'Missing :name parameter'
		});
	}

	var webhook = executor.getWebhook(name);

	if (webhook == null) {
		return res.status(400).json({
			error: 'Bad request',
			details: 'Invalid :name'
		});
	}

	if (!handler.isEventSupported(req.body)) {
		return res.status(501).json({
			error: 'Unsupported',
			details: 'Event type not supported'
		});
	}

	// Create message send post webhook
	handler.createMessage(req.body).then(function(message) {
		return executor.execute(message, webhook);
	}).then(function() {
		res.status(202).send();

		var ms = new Date().getTime() - start;
		winston.info('Delivered event sucessfully to webhook', name, 'in ' + ms + 'ms');
	}).catch(function(err) {
		winston.error('Unexpected error processing event', err);

		return res.status(503).json(err);
	});
});

module.exports = router;
