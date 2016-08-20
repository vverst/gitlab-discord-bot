module.exports = {
  "discord": {
    // The secret token found in your application's settings
    "token": "[Discord bot token]",
    // The user ID of the bot owner, used to restrict administrative commands to only this user
    "owner": "[User snowflake ID]"
  },
  "server": {
    // The port the internal webserver will listen on
    "port": 8080,
    // The strong secret token used between the GitLab server and bot. (example: mDV3yWuas9dSRNpM5f5KGBFdWfd43zRF)
    "secret": "CHANGE_ME"
  }
};
