const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	name: 'ranginfo',
  category: "Mod",
  aliases: ["rolecheck", "rangcheck", "ri"],
	run: async (client, message, args) => {
		// code starts here
		try {
			const roleName = message.guild.roles.cache
				.find((r) => (r.name === args.toString()) || (r.id === args.toString()));

			const perms = new Permissions(roleName.permissions.bitfield).toArray();

			const embed = new MessageEmbed()
				.setColor(roleName.color)
				.setTitle(roleName.name)
				.addFields(
					{
						name: 'Rang ID-ja: ',
						value: roleName.id,
						inline: true,
					},
					{
						name: 'Rang neve: ',
						value: roleName.name,
						inline: true,
					},
					{
						name: 'Megemlíthető? ',
						value: roleName.mentionable ? 'Igen' : 'Nem',
						inline: true,
					},
					{
						name: 'Rang Jogosultságai: ',
						value: perms.join(', '),
					},
				);

			return message.channel.send(embed);
		} catch (e) {
			return message.channel.send('Érvénytelen paraméterek. A rang **ID**-ját add meg!').then(() => console.log(e));
		}
	},
};
