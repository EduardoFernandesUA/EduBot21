const { MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('Create a temporary channel')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Defines the temporary channel name')
				.setRequired(true)),
	async execute(interaction) {

		const channels = await interaction.member.guild.channels.fetch();
		let category = channels.find(channel => channel.type == 'GUILD_CATEGORY' && channel.name == 'Temp Channels');

		if (!category) {
			// if temp channels does not exist
			interaction.member.guild.channels.create('Temp Channels', { type: 'GUILD_CATEGORY' })
				.then(channel => category = channel);
		}

		const channelName = interaction.options.getString('name');

		interaction.member.guild.channels.create(channelName, {
			type: 'GUILD_VOICE',
			parent: category,
			permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.P],
				},
			],
		});
		// await interaction.reply('Channel Created Successfully!');
	},
};
