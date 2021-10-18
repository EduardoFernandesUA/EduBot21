const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('Deletes n messages')
		.addNumberOption(option =>
			option.setName('number')
				.setDescription('max range is 99')
				.setRequired(true)),
	async execute(interaction) {
		interaction.channel.bulkDelete(1);
		await interaction.reply('Vai po caralho obla');
	},
};
