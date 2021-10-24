const Discord = require("discord.js")
module.exports = {
    name: "uptime",
	aliases: ["uptime"],
    category: "Altalanos",
    description: "Returns latency and API ping",
    usage: "uptime",
    run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const uptime = new Discord.MessageEmbed()
    .setTitle(`**Uptime**`)
    .setTimestamp()
    .setFooter(client.user.username) 
    .setDescription(`:clock1: \`${days}nap\` \`${hours}óra\` \`${minutes}perc\` \`${seconds}mp\``);			
    return message.channel.send(uptime);
    }
}
