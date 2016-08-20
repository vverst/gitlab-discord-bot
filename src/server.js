var app = require('./app.js');

var express = require('express');
var bodyParser = require('body-parser');

var handlers = {
  push: new (require('./handlers/push.js'))
};

class WebhookServer {
  constructor(port, secret) {
    this.server = express();
    this.server.use(bodyParser.json());

    this.port = port;
    this.secret = secret;

    this.server.post('/api/v1/event', (req, res) => { handleEvent(this, req, res); });
  }

  listen(callback) {
    this.server.listen(this.port, callback);
  }
}


function handleEvent(server, req, res) {
  if (req.headers["x-gitlab-token"] != server.secret) {
    res.sendStatus(403);
    return;
  }

  var handler = handlers[req.body.object_kind];

  if (handler == null) {
    res.sendStatus(503);
    return;
  }

  var result = handler.handle(req.body);

  // app.discord.notify(result);

  res.sendStatus(200);
}

module.exports = WebhookServer;
