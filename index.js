const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, prefix } = require('./config');

/* setup client */
const client = new Client({
	presence: {
		status: 'online',
		activity: {
			name: `${prefix}help`,
			type: 'LISTENING',
		},
	},
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.tempChannels = new Collection();

/* store all commands on client.commands */
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

/* prepare all events */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/* start the server and the bot */
require('./server')();
client.login(token);