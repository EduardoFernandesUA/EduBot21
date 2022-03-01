const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('Deletes n messages')
		.addStringOption(option =>
			option.setName('music')
				.setRequired(true)),
	async execute(interaction) {
        console.log("bah")
	},
};
