const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'slowmode',
  aliases: ["sm", "slm", "slwm"],
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Nincs jogod ehhez a parancshoz. Szükséges jog: `Csatornák kezelése`').then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) {
			return message.channel.send('Nem adtál meg időt. **Adj meg egy időt!** (pl. 5s, 2h)').then((m) => m.delete({ timeout: 5000 }));
		}

		const currentCooldown = message.channel.rateLimitPerUser;

		const reason = args[1] ? args.slice(1).join(' ') : 'nincs megadva indok';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		if (args[0] === 'off') {
			if (currentCooldown === 0) return message.channel.send('Csatorna cooldown kikapcsolva!').then((m) => m.delete({ timeout: 5000 }));

			embed.setTitle('Slowmode kikapcsolva.')
				.setColor('#00ff00');
			return message.channel.setRateLimitPerUser(0, reason);
		}

		const time = ms(args[0]) / 1000;

		if (Number.isNaN(time)) {
			return message.channel.send(`Ez nem egy idő. Próbáld meg újra! Helyes használat: ***.slowmode <idő>***`).then((m) => m.delete({ timeout: 5000 }));
		}

		if (time >= 21600) {
			return message.channel.send('Ez a slowmode idővallum túl nagy! Maximális idővallum: **6 óra**.').then((m) => m.delete({ timeout: 5000 }));
		}

		if (currentCooldown === time) {
			return message.channel.send(`Slowmodeot átrakad erre: ${args[0]}s`);
		}

		embed.setTitle('Slowmode bekapcsolva.')
			.addField('Slowmode: ', args[0])
			.addField('Indok: ', reason)
			.setColor('#ff0000');

		const msg = await message.channel.setRateLimitPerUser(time, reason);
		return msg.send(embed);
	},
};
