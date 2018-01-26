module.exports = {
	server: {
		port: process.env.PORT || 8080
	},
	webhooks: {
		[process.env.WEBHOOK_NAME || "my-super-awesome-hook"]: process.env.WEBHOOK_URL || "https://canary.discordapp.com/api/webhooks/123456789123456789/aaaBBB"
	},
	authentication: {
		secret: process.env.WEBHOOK_SECRET || "change_me"
	}
};
