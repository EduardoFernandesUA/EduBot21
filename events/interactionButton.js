module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction) {
		if (!interaction.isButton()) return;
		console.log(interaction);
		interaction.reply('Done');
	},
};