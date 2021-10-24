const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'give-role',
  category: "Mod",
  aliases: ["rangadd", "rangadás", "give-roles"],
	run: async (client, message, args) => {
		message.delete();

		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Ehhez nincs jogod! Szükséges jog: **Szerepek kezelése**").then((m) => m.delete({ timeout: 5000 }));

		if (!args[0] || !args[1]) return message.channel.send("Helytelen használat! Helyes használat: **-give-role <@felhasználó> <rang neve/id-ja>**").then((m) => m.delete({ timeout: 50000000 }));

		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const roleName = message.guild.roles.cache.find((r) => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

			const alreadyHasRole = member._roles.includes(roleName.id);

			if (alreadyHasRole) return message.channel.send('User already has that role').then((m) => m.delete({ timeout: 5000 }));

			const embed = new MessageEmbed()
				.setTitle(`Rang neve: ${roleName.name}`)
				.setDescription(`${message.author} sikeresen ráadta a/az ${roleName} rangot  ${member.user}-ra/-re`)
				.setColor('f3f3f3')
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(new Date().toLocaleString());

			return member.roles.add(roleName).then(() => message.channel.send(embed));
		} catch (e) {
			return message.channel.send('Legközelebb létező rangot adj meg...').then((m) => m.delete({ timeout: 5000 }));
		}
	},
};
