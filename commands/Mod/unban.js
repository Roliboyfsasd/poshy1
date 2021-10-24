const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'unban',
  category: "Mod",
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Nincsen ilyen jogosultságod: **TAGOK_KITILTÁSA** jogosultság!').then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) return message.channel.send('Add meg annak a felhasználónak az **ID**-ját, akinek fel szeretnéd oldani a kitiltását!').then((m) => m.delete({ timeout: 5000 }));

		let member;

		try {
			member = await client.users.fetch(args[0]);
		} catch (e) {
			console.log(e);
			return message.channel.send('Hibás, vagy rossz ID-t adtál meg. **Ellenőrizd az ID-t, és próbálkozz újra!**').then((m) => m.delete({ timeout: 5000 }));
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		return message.guild.fetchBans().then((bans) => {
			const user = bans.find((ban) => ban.user.id === member.id);

			if (user) {
				embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
					.setColor('#00ff00')
					.addField('User ID', user.user.id, true)
					.addField('User Tag', user.user.tag, true)
					.addField('Ban indoka', user.reason != null ? user.reason : 'no reason')
					.addField('Unban indok', reason);
				message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed));
			} else {
				embed.setTitle(`${member.tag} nincs bannolva!`)
					.setColor('#ff0000');
				message.channel.send(embed);
			}
		}).catch((e) => {
			console.log(e);
			message.channel.send('Hiba lépett fel!');
		});
	},
};
