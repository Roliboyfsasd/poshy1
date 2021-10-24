const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "announce",
aliases: ["anc", "anc2"],
category: "Mod",
usage: "announce <szöveg>",
description: "Bejelentésként / embedként küld el egy üzenetet.",
run: async(client, message, args) => {
    //code by Nemarton#3573
  if(!message.member.hasPermission("ADMINISTRATION")) return message.channel.send(`Nincs elegendő jogosultságod a parancs végrehajtásához.<a:no:894980666637307925>`)
 await message.delete()
  let say = message.content.split(" ").slice(1).join(" ")
  if(!say) return message.channel.send(`<:No:900091087396425768> | `+"Nem tudtam elküldeni az üzenetet")
  let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`${say}`)
  .setColor("RANDOM")
.setFooter(` ${message.guild}`)
.setTimestamp()
  message.channel.send(embed)
}
}