module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			command.execute(interaction);
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executung this command!', ephemeral: true });
		}
	},
};