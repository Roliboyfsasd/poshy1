const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setreport",
    category: "report",
    usage: "setreport <#channel>",
    authorPermission: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`Nincs jogod a parancshoz!`)
        }
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Adj meg egy csatornát!`);

        if (Channel.type === "voice") return message.channel.send(`Adj meg egy **text(szöveges) csatornát**!`);

        await db.set(`report_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`Report rendszer, report szoba beállítva <#${Channel.id}>!`)

        return message.channel.send(Embed);

    }
};