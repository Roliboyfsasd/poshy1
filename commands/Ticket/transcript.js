const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'transcript',
	category: 'Ticket',
	description: 'Trascripts a specified ticket.',
	aliases: [],
	usage: 'transcript',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
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
							title: ` ${channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('Hiba lépett fel. Kérlek próbáld újra.');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 Transcript\`](${response.url})`)
						.setColor('GREEN');
					message.reply('Kész lett a log a hibajegy beszélgetéséről. Kattints ide, hogy megnézhesd.', embed);
				});
			}
		}
		else {
			return message.reply(
				'Itt nem használhatod ezt a parancsot. Kérjük, használd ezt a parancsot egy nyitott jegyben.',
			);
		}
	},
};