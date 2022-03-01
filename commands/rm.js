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
        let n = interaction.options.getNumber('number');
        interaction.channel.bulkDelete(n,true)
        .then(messages=>{
            interaction.reply('Deleted '+messages.size+' messages...');
        })
        .catch(console.error);
	},
};
