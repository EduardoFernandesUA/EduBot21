const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('Create a temporary channel that the creator can edit.')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Defines the temporary channel name')
				.setRequired(true)),
	async execute(interaction) {

		// get all channels and the temp channels category
		let channels = await interaction.member.guild.channels.fetch();
		let category = channels.find(channel => channel.type == 'GUILD_CATEGORY' && channel.name == 'Temp Channels');

		// if temp channels does not exist
		if (!category) {
			interaction.member.guild.channels.create('Temp Channels', { type: 'GUILD_CATEGORY' })
				.then(channel => category = channel);
		}

		// get the user inputs
		const channelName = interaction.options.getString('name');

		// create the channel
		let createdChannel = await interaction.member.guild.channels.create(channelName, {
			type: 'GUILD_VOICE',
			parent: category,
			permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.MANAGE_ROLES],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: [Permissions.FLAGS.VIEW_CHANNEL],
				},
			],
		});

		// interaction.client.tempChannels.set(createdChannel.id, createdChannel);

		await interaction.reply('Channel Created Successfully!');
	},
};
