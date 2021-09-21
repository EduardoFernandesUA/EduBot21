const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Returns the Help Menu'),
	async execute(interaction) {

		const embed = new MessageEmbed()
			.setTitle('HELP MENU')
			.setColor('GREEN')
			.setThumbnail(interaction.client.user.displayAvatarURL())
			.setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL())
			.addFields(interaction.client.commands.map(command => ({ name: prefix + command.data.name, value: command.data.description })));

		await interaction.reply({ embeds: [embed] });
	},
};
