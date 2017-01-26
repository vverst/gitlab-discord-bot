gitlab-discord-bot
---

A tiny GitLab notification bridge for Discord, written in NodeJS.

## Installation
Currently, the only installation method is to clone the Git repository to your target server and install the dependencies with `npm install`. In the future, packaged releases may be made available.

To start the bot, you can use `npm start`, or if you're using a process manager (such as PM2) you can use the entrypoint `src/app.js`.

If you will be installing the notification bridge to a seperate machine and wish to have it listen for requests on the public internet, you'll likely want to setup a NGINX reverse proxy to forward requests to the notification bridge correctly. It's also highly recommended you take the time to enable strong TLS encryption (HTTPS) using a free Let's Encrypt certificate for your bridge. While you can directly expose the bridge directly, it is strongly discouraged.

## Bot Configuration
A template configuration file can be found at `config.example.js`, and should be copied to `config.js` as a starting point. It's recommended you don't delete or otherwise modify the example configuration file to avoid merge conflicts when pulling new changes from the Git repository.

#### Listening
Your Discord bot will, by default, listen on `localhost:8080`. If this is unsuitable, you can change the port using the `server.port` option in your config.

#### Hooks
A Discord webhook creates an outlet for your bot to post notifications to. You'll need to have sufficient permissions to create and manage webhooks on the server you wish to configure. To begin, you'll need to create a Discord webook. If you're unfamilar with the process, please see [Discord's documentation](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

Once you've created and configured your webhook in Discord's UI, you can add the webhook's URL to your configuration file in the `webhooks` section. Examples are provided in the example configuration file `config.example.js`.

You can name your webhook in the configuration file whatever your heart desires, as it will only be used when configuring GitLab later.

#### Authentication
The example configuration uses the security token `change_me`. It is **strongly recommended** you change it to something more secure, especially if your bridge will be reachable from the internet.

## GitLab Configuration
You will need to be able to create webhooks on the GitLab repository you're wishing to bridge to Discord. When creating your webhook, you can choose which events you want to be posted to your bridge.

You can also configure as many GitLab webhooks to your bridge as you want, in any arrangement across multiple projects and sites.

To properly set up the bridge with GitLab, you will need to set the Webhook URL to the bridge's webhook endpoint. If your bridge is accessible on `localhost:8080`, your URL will look like this:

```
localhost:8080/api/v1/webhook/NAME
```

Or, if your bridge is accessible via HTTP, like this:

```
https://example.com/api/v1/webhook/NAME
```

Replace `NAME` with the name of your webhook you want your bridge to send the events to. This will be the exact name (without quotation marks) you gave your webhook in the configuration file.

For example, if your webhook is named `delicious-cake`, your URL will look like:

```
https:///example.com/api/v1/webhook/delicious-cake
```

You'll also need to provide the secret authentication token to GitLab for it to be able to send events. The token is the same as the one in your configuration file.

## Reporting Issues
Please be sure to run pull recent changes to the repository before submitting an issue. It's possible your issue has been already been resolved.

If you're still running into an issue, sorry about that! When creating your issue, please try to be descriptive and provide steps to reliably reproduce the issue, along with any additional configuration you have made (but please do not upload your private tokens or webhook URLs).

## Creating Pull Requests
Thanks for helping by contribute to this little project! I welcome all pull requests with open arms (including ones that poke at any mistakes I make), but I ask that you provide a brief overview of what your changes do when submitting a PR.

Additionally, please make sure your pull requests conform to the provided [ESLint] configuration. You can do so by running `npm run-script lint`.

## License
Licensed under GNU GPL v3.0. Please see the LICENSE file or the [HTML version](https://www.gnu.org/licenses/gpl-3.0.html) for more details.
