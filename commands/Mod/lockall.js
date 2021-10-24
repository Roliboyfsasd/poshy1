
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lockall',
	category: 'Mod',
	run: async (client, message, args) => {
    		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Hiányzó jogosultság: **Rendszergazda**!')
		const channels = message.guild.channels.cache.filter((ch) => ch.type !== 'category');
		if (args[0] === 'be') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
				}).then(() => {
					channel.setName('🔒┃'+ channel.name);
				});
			});
			return message.channel.send('Lock-oltam az összes csatornát');
		} if (args[0] === 'ki') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: true,
				}).then(() => {
					channel.setName(channel.name.replace('🔒┃', ''));
				});
			});
			return message.channel.send('Feloldottam az összes csatornáról a lock-ot.');
		}
		return '';
	},
};