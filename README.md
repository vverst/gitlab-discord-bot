## gitlab-discord-bot

A tiny GitLab notification bridge for Discord built using [Discord.io](https://github.com/izy521/discord.io).

### Installation
Currently, packages are not provided. You can install the bot from source by cloning the repository and running `npm install`.

To start the bot, use `npm start`.

### Bot configuration
A template configuration file can be found at `config.example.js`. Copy this to `config.js` and modify it appropriately.

### GitLab configuration
_**Note:** The internal web server of the bot needs to be exposed to your GitLab installation, preferably behind nginx with SSL._

Create a new webhook for your GitLab project, and set the endpoint to `http://$SERVER/api/v1/event/:channel`, where `$SERVER` is the location the internal server can be reached by, and `:channel` is the snowflake ID for the Discord channel to post the notification to.

Additionally, set the secret token field to the one defined in your configuration file.

### License
Licensed under the GNU GPL v3 license.
