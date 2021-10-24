module.exports = {
	name: 'new',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	aliases: [],
	usage: 'new',
	userperms: [],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('Neked már van egy ticketed! csak akkor tudsz újat csinálni, ha bezárod az előzőt.');
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			message.reply(`Elkészült a hibajegyed! Kattints ide -> ${channel}.`);
			channel.send(`Szia, ${message.author}, Üdvözöllek a hibajegyedben! Kérlek, légy türelemmel, nemsokára érkezik egy staff. Ha be szeretnéd zárni a ticketed, használd kérlek ezt a parancsot: \`,close\``);
			const logchannel = message.guild.channels.cache.find(channel => channel.name === 'ticket-logs');
			if(logchannel) {
				logchannel.send(`Hibajegy elkészítve! <@${message.author.id}> által. Csatorna: <#${channel.id}>`);
			}
		});
	},
};