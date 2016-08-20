var config = require("../config.js");

var server;
var discord;

var logger = require("winston");
logger.add(logger.transports.File, { filename: 'logs/latest.log' });

start();

function start() {
  logger.info("Starting HTTP server...");

  server = new (require("./server.js"))(config.server.port, config.server.secret);
  server.listen(function() {
    logger.info("HTTP server started");
  });

  logger.info("Starting Discord bot...");

  discord = new (require("./discord.js"))(config.discord.channel, config.discord.token);
  discord.bot.on('ready', function() {
    logger.info("Discord bot connected");
  });

  discord.connect();
}

function loadConfig() {
  logger.info("");
}

module.exports.server = server;
module.exports.discord = discord;
