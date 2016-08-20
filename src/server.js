var app = require('./app.js');

var express = require('express');
var bodyParser = require('body-parser');

var handlers = {
  push: new (require('./handlers/push.js'))
};

class WebhookServer {
  constructor(port) {
    this.server = express();
    this.server.use(bodyParser.json());

    this.port = port;

    this.server.post('/api/v1/event', handleEvent);
  }

  listen(callback) {
    this.server.listen(this.port, callback);
  }
}


function handleEvent(req, res) {
  var handler = handlers[req.body.object_kind];

  if (handler == null) {
    res.sendStatus(503);

    return;
  }

  var result = handler.handle(req.body);

  app.discord.notify(result);

  res.sendStatus(200);
}

module.exports = WebhookServer;
