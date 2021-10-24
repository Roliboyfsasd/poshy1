const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	category: 'Info',
	description: 'Returns Latency and API Ping',
	timeout: 10000000,
	run: async (client, message, args) => {
		const msg = await message.channel.send('Pingelés...');
		const Embed = new MessageEmbed()
			.setTitle('Ping!')
			.setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
			.setDescription(
				`⌛ Késedelem ${Math.floor(
					msg.createdTimestamp - message.createdTimestamp,
				)}ms\n⏲️ API Ping ${Math.round(client.ws.ping)}`,
			)
			.setColor('#fb644c');
		await msg.edit('\u200b');
		return msg.edit(Embed);
	},
};