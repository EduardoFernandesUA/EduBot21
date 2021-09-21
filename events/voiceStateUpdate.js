module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute(oldVoiceState, newVoiceState) {
		// console.log(oldVoiceState, newVoiceState);
		if (!oldVoiceState || !oldVoiceState.channel) return;
		oldVoiceState.channel
			.fetch()
			.then(ch => {
				if (ch.parent.name == 'Temp Channels' && ch.members.size == 0) {
					ch.delete();
				}
			});
		// console.log(oldVoiceState.channel ? oldVoiceState.channel.members.count : 0);
	},
};