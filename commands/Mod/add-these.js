const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "add-these",
    category: "Mod",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **Nincs jogod!**`)
}
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.channel.send(`:x: | **Adj meg egy emojit!**`);
        emojis.forEach(emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
            message.guild.emojis.create(
                `${Link}`,
                `${`${emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + " hozzáadva!!")).catch(error => {
              message.channel.send(":x: | Hiba lépett fel!")
                console.log(error)
})
          
        }
        })
}
}