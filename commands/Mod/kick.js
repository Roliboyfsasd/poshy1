const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	category: 'Mod',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('Nem tudod kickelni, mivel nincs meg az adot t jogosultság (Tagok_Kirugása)');
		}
		if (!args[0]) {
			return message.channel.send('Tagelj meg egy embert.!');
		}
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		try {
			await member.kick();
			return message.channel.send(`${member} kickelve lett.!`);
		} catch (e) {
			return message.channel.send('Nincs bent a szerveren, vagy ugyan olyan rangja van mint neked.!');
		}
	},
};
