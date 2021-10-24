/* eslint-disable no-unused-vars */
module.exports = {
	name: 'open',
	category: 'Ticket',
	description: 'Re-opens a ticket.',
	aliases: [],
	usage: 'open',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args) => {
		if (message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			try {
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				})
					.then(() => {
						message.channel.send(`Sikeresen újra megnyitottad: ${message.channel}`);
					});
			}
			catch (e) {
				return message.channel.send('Hiba lépett fel, próbáld újra!');
			}
		}
		else {
			return message.reply(
				'Te nem használhatod ezt a parancsot. Ezt olyan csatornába írd be, ami be van zárva. ',
			);
		}
	},
};