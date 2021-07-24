const tmi = require('tmi.js');

class ChatClient (username, token, channel) {
	this.username = username;
	this.token = token;
	this.channel = channel;

	const tmiOpts = {
		options: { debug: true, messagesLogLevel: "info" },
		connection: {
			reconnect: true,
			secure: true
		},
		identity: {
			username: this.username,
			password: this.token,
		},
		channels: [ this.channel ]
	}
	this.client = new tmi.client(tmiOpts);
}

connect() {
	this.client.connect().catch(console.error);
	this.client.on('message', (channel, tags, message, self) => {
		if(self) return;
		if(message.toLowerCase() === '!hello') {
			client.say(channel, `@${tags.username}, heya!`);
		}
	});
}


disconnect() {
	this.client.disconnect().catch(console.error);
}




module.exports = ChatClient;