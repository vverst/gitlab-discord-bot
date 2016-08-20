var Discord = require('discord.io');

class DiscordBot {
  constructor(token) {
    this.bot = new Discord.Client({
      token: token
    });

    this.bot.on('message', handleMessage);

    this.token = token;
  }

  connect() {
    this.bot.connect();
  }

  notify(channel, message) {
    this.bot.sendMessage({
      to: channel,
      message: message
    })
  }
}

module.exports = DiscordBot;

function handleMessage(user, userID, channelID, message, rawEvent) {
  if (message === "!gitlab") {
    bot.sendMessage({
      to: channelID,
      message: "ping pong ding blarg"
    })
  }
}
