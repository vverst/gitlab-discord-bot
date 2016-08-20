var Discord = require('discord.io');

class DiscordBot {
  constructor(channel, token) {
    this.bot = new Discord.Client({
      token: token
    });

    this.bot.on('message', handleMessage);

    this.channel = channel;
    this.token = token;
  }

  connect() {
    this.bot.connect();
  }

  notify(message) {
    this.bot.sendMessage({
      to: this.channel,
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
