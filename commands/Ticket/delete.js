/* eslint-disable no-unused-vars */
module.exports = {
	name: 'delete',
	category: 'Ticket',
	description: 'Delete a specified ticket.',
	aliases: [],
	usage: 'delete',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {
			return message.reply('Nem használhatod ezt a parancsot itt, használd a ticketes szobádba amit szeretnél törölni!');
		}
	},
};