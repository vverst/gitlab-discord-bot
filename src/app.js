const winston = require('winston');
winston.info('Starting bridge');

const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
exports.config = config;

const router = require('./router');

var app = express();
app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(config.server.port, function() {
	winston.info('Listening on localhost:8080');
});
