/* eslint-disable no-unused-vars */
const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'close',
	category: 'Ticket',
	description: 'Closes the ticket.',
	aliases: [],
	usage: 'close',
	userperms: [],
	botperms: [],
	run: async (bot, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('hu-HU')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Chat log erről: ${message.channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('Hiba lépett fel, próbáld újra!');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 Előnézet\`](${response.url})`)
						.setColor('GREEN');
					member.send('Itt a log a ticket beszélgetéséről, kattins a linkre, hogy megnézd!', embed);
				}).then(() => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Sikeresen bezártad a ticketet ${message.channel}`);
						});
					}
					catch(e) {
						return message.channel.send('Hiba lépett fel, próbáld újra!');
					}
				});
			}
		}
		else {
			return message.reply('Itt nem használhatod ezt a parancsot. Kérjük, használd ezt a parancsot, amikor jegyet zárt.');
		}
	},
};