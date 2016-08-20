var app = require('./app.js');

var express = require('express');
var bodyParser = require('body-parser');

var handlers = {
  push: new (require('./handlers/push.js')),
  issue: new (require('./handlers/issue.js')),
  note: new (require('./handlers/note.js'))
};

class WebhookServer {
  constructor(port, secret) {
    this.server = express();
    this.server.use(bodyParser.json());

    this.port = port;
    this.secret = secret;

    this.server.post('/api/v1/event/:channel', (req, res) => { handleEvent(this, req, res); });
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

  if (req.params.channel == null) {
    res.sendStatus(400, {
      "error": "Missing channel"
    });

    return;
  }

  var handler = handlers[req.body.object_kind];

  if (handler == null) {
    res.sendStatus(200);

    return;
  }

  var result = handler.handle(req.body);

  if (result != null) {
    app.discord.notify(req.params.channel, result);
  }

  res.sendStatus(200);
}

module.exports = WebhookServer;
