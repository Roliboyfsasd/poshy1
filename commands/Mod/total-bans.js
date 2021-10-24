const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'total-bans',
	category: 'Mod',
	run: async (client, message, args) => {
		message.guild.fetchBans().then((bans) => {
			message.channel.send(`**${bans.size}** tag van bannolva.`);
		});
	},
};
